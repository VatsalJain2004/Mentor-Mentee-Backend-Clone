const supabase = require("../../common/database");

// 5. Assign mentee(s) to mentor
const assignMenteesToMentor = async (req, res) => {
  const { employeeid, mentees, mentorDepartment } = req.body;

  if (!employeeid || !Array.isArray(mentees)) {
    return res.status(400).json({ message: "Missing employeeid or mentees array" });
  }

  try {
    for (const scholar_no of mentees) {
      // Add to mentorList
      const { data: existing } = await supabase
        .from("mentorList")
        .select("*")
        .eq("scholar_no", scholar_no)
        .single();

      if (existing) {
        await supabase.from("mentorList").update({ employeeid, mentorDepartment }).eq("scholar_no", scholar_no);
      } else {
        await supabase.from("mentorList").insert([{ employeeid, scholar_no, mentorDepartment }]);
      }

      // Update mentee table
      await supabase.from("mentee").update({ mentorID: employeeid }).eq("scholar_no", scholar_no);
    }

    // Update mentor.mentees array
    const { data: mentorData } = await supabase
      .from("mentor")
      .select("mentees")
      .eq("employeeid", employeeid)
      .single();

    const currentMentees = mentorData?.mentees || [];
    const updatedMentees = Array.from(new Set([...currentMentees, ...mentees.map(Number)]));

    await supabase.from("mentor").update({ mentees: updatedMentees }).eq("employeeid", employeeid);

    res.json({ message: `Assigned ${mentees.length} mentees to mentor ${employeeid}` });
  } catch (err) {
    res.status(500).json({ message: "Error assigning mentees", error: err.message });
  }
};

// 6. Assign mentor to a mentee
const assignMentorToMentee = async (req, res) => {
  const { scholar_no, employeeid, mentorDepartment } = req.body;

  if (!scholar_no || !employeeid) {
    return res.status(400).json({ message: "Missing scholar_no or employeeid" });
  }

  try {
    // Update mentee
    await supabase.from("mentee").update({ mentorID: employeeid }).eq("scholar_no", scholar_no);

    // Add to mentorList
    const { data: existing } = await supabase
      .from("mentorList")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (existing) {
      await supabase.from("mentorList").update({ employeeid, mentorDepartment }).eq("scholar_no", scholar_no);
    } else {
      await supabase.from("mentorList").insert([{ employeeid, scholar_no, mentorDepartment }]);
    }

    // Update mentor.mentees
    const { data: mentorData } = await supabase
      .from("mentor")
      .select("mentees")
      .eq("employeeid", employeeid)
      .single();

    const updatedMentees = mentorData?.mentees || [];

    if (!updatedMentees.includes(parseInt(scholar_no))) {
      updatedMentees.push(parseInt(scholar_no));

      await supabase
        .from("mentor")
        .update({ mentees: updatedMentees })
        .eq("employeeid", employeeid);
    }

    res.json({ message: `Assigned mentor ${employeeid} to scholar_no ${scholar_no}` });
  } catch (err) {
    res.status(500).json({ message: "Error assigning mentor", error: err.message });
  }
};

module.exports = {
  assignMenteesToMentor,
  assignMentorToMentee
};
