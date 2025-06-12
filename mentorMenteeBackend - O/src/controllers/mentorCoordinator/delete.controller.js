import supabase from "../../db/database.js";

const deleteMentor = async (req, res) => {
  const { employeeid } = req.body;

  if (!employeeid) {
    return res.status(400).json({ message: "Missing employeeid" });
  }

  try {
    // Fetch mentor's mentees first
    const { data: mentorData, error: mentorFetchError } = await supabase
      .from("mentor")
      .select("mentees")
      .eq("employeeid", employeeid)
      .single();

    if (mentorFetchError) {
      return res.status(500).json({ message: "Mentor fetch error", error: mentorFetchError.message });
    }

    const mentees = mentorData?.mentees || [];

    // Clear mentorID from mentees
    await Promise.all(
      mentees.map(async (scholar_no) => {
        await supabase.from("mentee").update({ mentorID: null }).eq("scholar_no", scholar_no);
        await supabase.from("mentorList").delete().eq("scholar_no", scholar_no);
      })
    );

    // Delete mentor row
    await supabase.from("mentor").delete().eq("employeeid", employeeid);

    res.json({ message: `Mentor ${employeeid} and related data deleted successfully.` });
  } catch (err) {
    res.status(500).json({ message: "Error deleting mentor", error: err.message });
  }
};

// 4. Delete mentee for a particular mentor
const deleteMenteeFromMentor = async (req, res) => {
  const { employeeid, scholar_no } = req.body;

  if (!employeeid || !scholar_no) {
    return res.status(400).json({ message: "Missing employeeid or scholar_no" });
  }

  try {
    // Remove scholar_no from mentorList
    await supabase.from("mentorList").delete().eq("scholar_no", scholar_no);

    // Clear mentorID in mentee table
    await supabase.from("mentee").update({ mentorID: null }).eq("scholar_no", scholar_no);

    // Remove scholar_no from mentor.mentees array
    const { data: mentorData } = await supabase
      .from("mentor")
      .select("mentees")
      .eq("employeeid", employeeid)
      .single();

    const updatedMentees = (mentorData?.mentees || []).filter(id => id !== scholar_no);

    await supabase
      .from("mentor")
      .update({ mentees: updatedMentees })
      .eq("employeeid", employeeid);

    res.json({ message: `Mentee ${scholar_no} removed from mentor ${employeeid}` });
  } catch (err) {
    res.status(500).json({ message: "Error removing mentee", error: err.message });
  }
};

export { deleteMentor, deleteMenteeFromMentor };
