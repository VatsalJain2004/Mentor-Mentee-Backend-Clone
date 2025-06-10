const supabase = require("../../common/database");

const getMentorsWithMentees = async (req, res) => {
  try {
    // Get all mentors
    const { data: mentors, error: mentorError } = await supabase
      .from("mentor")
      .select("employeeid, name");

    if (mentorError) throw mentorError;

    // Get all mentees
    const { data: mentees, error: menteeError } = await supabase
      .from("mentee")
      .select("scholar_no, name, mentorID");

    if (menteeError) throw menteeError;

    // Map to build mentor -> mentees
    const mentorMap = {};

    mentors.forEach((mentor) => {
      mentorMap[mentor.employeeid] = {
        id: mentor.employeeid,
        name: mentor.name,
        mentorId: mentor.employeeid,
        scholars: [],
      };
    });

    // Track unassigned mentees
    const unassignedMentees = [];

    mentees.forEach((mentee) => {
      const mentor = mentorMap[mentee.mentorID];
      if (mentor) {
        mentor.scholars.push({
          id: mentee.scholar_no,
          name: mentee.name,
          scholarId: mentee.scholar_no,
        });
      } else {
        unassignedMentees.push({
          id: mentee.scholar_no,
          name: mentee.name,
          scholarId: mentee.scholar_no,
        });
      }
    });

    const result = Object.values(mentorMap);

    res.json({
      mentorsWithMentees: result,
      unassignedMentees: unassignedMentees,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// 2. Get list of mentees and their mentors (optional modification)
const getMenteesWithMentors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("mentee")
      .select("scholar_no, name");

    if (error) {
      return res.status(500).json({ message: "Error fetching mentees", error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getMentorsWithMentees, getMenteesWithMentors };
