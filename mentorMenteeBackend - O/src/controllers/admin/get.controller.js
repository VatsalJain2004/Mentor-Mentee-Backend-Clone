import { supabase } from "../../db/database.js";

const getMentorCoordinatorWithMentors = async (req, res) => {
  try {
    // Step 1: Fetch mentor_coordinator_id and employeeid from mentorList
    const { data: mentorList, error: listError } = await supabase
      .from('mentorList')
      .select('mentor_coordinator_id, employeeid');

    if (listError) throw listError;

    // Step 2: Get unique non-null mentor_coordinator_ids and employeeids
    const coordinatorIds = [...new Set(
      mentorList
        .map(item => item.mentor_coordinator_id)
        .filter(id => id !== null)
    )];

    const mentorIds = [...new Set(
      mentorList
        .map(item => item.employeeid)
        .filter(id => id !== null)
    )];

    // Step 3: Fetch mentor coordinators' name and department
    const { data: coordinators, error: coordinatorError } = await supabase
      .from('mentor_coordinator')
      .select('mentor_coordinator_id, name, department')
      .in('mentor_coordinator_id', coordinatorIds);

    if (coordinatorError) throw coordinatorError;

    // Step 4: Fetch mentors' name and department
    const { data: mentors, error: mentorError } = await supabase
      .from('mentor')
      .select('employeeid, name, department')
      .in('employeeid', mentorIds);

    if (mentorError) throw mentorError;

    // Step 5: Map mentors for easy lookup
    const mentorMap = {};
    mentors.forEach((mentor) => {
      mentorMap[mentor.employeeid] = {
        employeeid: mentor.employeeid,
        name: mentor.name,
        department: mentor.department
      };
    });

    // Step 6: Build hierarchical structure
    const coordinatorMap = {};

    coordinators.forEach((coordinator) => {
      coordinatorMap[coordinator.mentor_coordinator_id] = {
        mentor_coordinator_id: coordinator.mentor_coordinator_id,
        name: coordinator.name,
        department: coordinator.department,
        mentors: []
      };
    });

    mentorList.forEach((relation) => {
      const coordinator = coordinatorMap[relation.mentor_coordinator_id];
      const mentor = mentorMap[relation.employeeid];

      if (coordinator && mentor) {
        coordinator.mentors.push(mentor);
      }
    });

    const result = Object.values(coordinatorMap);

    res.json({ coordinatorWithMentors: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getMentorsWithMentees = async (req, res) => {
  try {
    // Get all mentors with department
    const { data: mentors, error: mentorError } = await supabase
      .from("mentor")
      .select("employeeid, name, department");

    if (mentorError) throw mentorError;

    // Get all mentees with branch
    const { data: mentees, error: menteeError } = await supabase
      .from("mentee")
      .select("scholar_no, name, branch, mentorID");

    if (menteeError) throw menteeError;

    // Map mentors to their mentees
    const mentorMap = {};

    mentors.forEach((mentor) => {
      mentorMap[mentor.employeeid] = {
        id: mentor.employeeid,
        name: mentor.name,
        department: mentor.department,
        mentorId: mentor.employeeid,
        scholars: [],
      };
    });

    mentees.forEach((mentee) => {
      const mentorID = mentee.mentorID;
      if (mentorID && mentorMap[mentorID]) {
        mentorMap[mentorID].scholars.push({
          id: mentee.scholar_no,
          name: mentee.name,
          branch: mentee.branch,
          scholarId: mentee.scholar_no,
        });
      }
    });

    const result = Object.values(mentorMap);

    res.json({
      mentorsWithMentees: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




const getMenteesFromMentorList = async (req, res) => {
  try {
    // Step 1: Get scholar_no + mentor info from mentorList table
    const { data: mentorList, error: mentorListError } = await supabase
      .from("mentorList")
      .select("scholar_no, mentor:employeeid ( employeeid, name, department )");

    if (mentorListError) throw mentorListError;

    // Filter out null or undefined scholar numbers
    const scholarNos = mentorList
      .map(item => item.scholar_no)
      .filter(id => id !== null && id !== undefined);

    // Step 2: Get mentees with matching scholar_no
    let mentees = [];
    if (scholarNos.length > 0) {
      const { data: menteesData, error: menteeError } = await supabase
        .from("mentee")
        .select("scholar_no, name, branch")
        .in("scholar_no", scholarNos);

      if (menteeError) throw menteeError;

      // Merge mentor info into each mentee
      mentees = menteesData.map(mentee => {
        const match = mentorList.find(m => m.scholar_no === mentee.scholar_no);
        return {
          ...mentee,
          mentorId: match?.mentor?.employeeid || null,
          mentorName: match?.mentor?.name || null,
          mentorDepartment: match?.mentor?.department || null,
        };
      });
    }

    // Step 3: Get all mentees
    const { data: allMentees, error: allMenteesError } = await supabase
      .from("mentee")
      .select("scholar_no, name, branch");

    if (allMenteesError) throw allMenteesError;

    // Step 4: Filter mentees who are not in mentorList
    const scholarSet = new Set(scholarNos);
    const unassignedMentees = allMentees.filter(
      mentee => !scholarSet.has(mentee.scholar_no)
    );

    res.json({ mentees, unassignedMentees });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export { getMentorCoordinatorWithMentors, getMentorsWithMentees, getMenteesFromMentorList };
