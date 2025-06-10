const supabase = require("../../common/database");

const processMentorData = async (mentors) => {
  for (const mentor of mentors) {
    const { mentor_coordinator_id, employeeid, scholar_no, mentorDepartment } = mentor;

    console.log(`Processing: Coordinator ID: ${mentor_coordinator_id}, Employee ID: ${employeeid}, Scholar No: ${scholar_no}, Department: ${mentorDepartment}`);

    // Check if scholar_no already exists in mentorList
    const { data: existingMentor, error: fetchError } = await supabase
      .from("mentorList")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error(`Error fetching mentorList for scholar_no ${scholar_no}:`, fetchError.message);
      continue;
    }

    if (existingMentor) {
      // Check if any hierarchy data is different, update if needed
      if (
        existingMentor.employeeid !== employeeid ||
        existingMentor.mentor_coordinator_id !== mentor_coordinator_id ||
        existingMentor.mentorDepartment !== mentorDepartment
      ) {
        const { error: updateError } = await supabase
          .from("mentorList")
          .update({ employeeid, mentor_coordinator_id, mentorDepartment })
          .eq("scholar_no", scholar_no);

        if (updateError) {
          console.error(`Error updating mentorList for scholar_no ${scholar_no}:`, updateError.message);
        } else {
          console.log(`Updated mentorList for scholar_no ${scholar_no}.`);
        }
      } else {
        console.log(`Scholar No: ${scholar_no} already exists in mentorList with same data, skipping update.`);
      }
    } else {
      // Insert new record in mentorList
      const { error: insertError } = await supabase
        .from("mentorList")
        .insert([{ mentor_coordinator_id, employeeid, scholar_no, mentorDepartment }]);

      if (insertError) {
        console.error(`Error inserting into mentorList for scholar_no ${scholar_no}:`, insertError.message);
        continue;
      }

      console.log(`Inserted scholar_no ${scholar_no} into mentorList.`);
    }

    // Update mentee table: set mentorID (employeeid) for scholar_no
    const { error: menteeUpdateError } = await supabase
      .from("mentee")
      .update({ mentorID: employeeid })
      .eq("scholar_no", scholar_no);

    if (menteeUpdateError) {
      console.error(`Error updating mentee with mentorID for scholar_no ${scholar_no}:`, menteeUpdateError.message);
    } else {
      console.log(`Updated mentee scholar_no ${scholar_no} with mentorID ${employeeid}.`);
    }

    // Update mentor table: add scholar_no to mentees array
    const { data: mentorData, error: mentorFetchError } = await supabase
      .from("mentor")
      .select("mentees")
      .eq("employeeid", employeeid)
      .single();

    if (mentorFetchError && mentorFetchError.code !== 'PGRST116') {
      console.error(`Error fetching mentor with employeeid ${employeeid}:`, mentorFetchError.message);
      continue;
    }

    let updatedMentees = mentorData?.mentees || [];

    if (!updatedMentees.includes(parseInt(scholar_no))) {
      updatedMentees.push(parseInt(scholar_no));

      const { error: mentorUpdateError } = await supabase
        .from("mentor")
        .update({ mentees: updatedMentees })
        .eq("employeeid", employeeid);

      if (mentorUpdateError) {
        console.error(`Error updating mentor mentees array for employeeid ${employeeid}:`, mentorUpdateError.message);
      } else {
        console.log(`Updated mentor ${employeeid} with new mentee: ${scholar_no}`);
      }
    } else {
      console.log(`Mentor ${employeeid} already has scholar_no ${scholar_no} in mentees array, skipping.`);
    }

    // OPTIONAL: Update mentorCoordinator table (if exists) with employeeid
    const { data: coordinatorData, error: coordFetchError } = await supabase
      .from("mentorCoordinator")
      .select("employees")
      .eq("mentor_coordinator_id", mentor_coordinator_id)
      .single();

    if (!coordFetchError) {
      let updatedEmployees = coordinatorData?.employees || [];

      if (!updatedEmployees.includes(employeeid)) {
        updatedEmployees.push(employeeid);

        const { error: coordUpdateError } = await supabase
          .from("mentorCoordinator")
          .update({ employees: updatedEmployees })
          .eq("mentor_coordinator_id", mentor_coordinator_id);

        if (coordUpdateError) {
          console.error(`Error updating coordinator ${mentor_coordinator_id}:`, coordUpdateError.message);
        } else {
          console.log(`Updated mentorCoordinator ${mentor_coordinator_id} with new employee: ${employeeid}`);
        }
      }
    }
  }

  console.log("Mentor list processed successfully.");
};


// Upload handler
const uploadMentorList = async (req, res) => {
  console.log("Received data in backend:", req.body);

  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  try {
    await processMentorData(data);
    res.json({ message: "Mentor list processed successfully" });
  } catch (error) {
    console.error("Error processing mentor list:", error.message);
    res.status(500).json({ message: "Error processing data", error: error.message });
  }
};

module.exports = { uploadMentorList };
