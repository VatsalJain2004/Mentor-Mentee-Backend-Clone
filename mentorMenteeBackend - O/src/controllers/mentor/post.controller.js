import supabase from "../../db/database.js";
import jwt from "jsonwebtoken";

// Mentor-specific sign-in logic
const signIn = async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Fetch the user by user_id, including role
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('user_id, password, role') // Ensure 'role' is included
      .eq('user_id', userId)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return res.status(500).json({ message: "Error fetching user", error: userError.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Directly compare password
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with userId and role
    const token = jwt.sign(
      { userId: user.user_id, role: user.role }, // Include role in the payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role, // Include role in the response
      userId: user.user_id,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message || error });
  }
};

const addMentorDetails = async (req, res) => {
  const {
    name,
    designation,
    email,
    contact,
    department,
    expertiseAreas,
    experience,
    cabinNo,
    officeHours_from,
    officeHours_to,
    preferredCommunication,
    employeeId,
  } = req.body;
  try {
    // Check if userId already exists as scholarno
    const { data: existingMentor, error: fetchError } = await supabase
      .from('mentor')
      .select('*')
      .eq('employeeid', employeeId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      return res.status(500).json({ message: "Error checking existing mentor", error: fetchError.message });
    }

    let result;
    if (existingMentor) {
      // Update existing row
      const { data: updatedMentor, error: updateError } = await supabase
        .from('mentor')
        .update({
          name,
          designation,
          email,
          contact,
          department,
          expertiseAreas,
          experience,
          cabinNo,
          officeHours_from,
          officeHours_to,
          preferredCommunication,
        })
        .eq('employeeid', userId)
        .select('*')
        .single();

      if (updateError) {
        return res.status(500).json({ message: "Error updating mentor details", error: updateError.message });
      }

      result = updatedMentor;
    } else {
      // Insert new row
      const { data: newMentor, error: insertError } = await supabase
        .from('mentor')
        .insert([
          {
            name,
            designation,
            email,
            contact,
            department,
            expertiseAreas,
            experience,
            cabinNo,
            officeHours_from,
            officeHours_to,
            preferredCommunication,
          }
        ])
        .select('*')
        .single();

      if (insertError) {
        return res.status(500).json({ message: "Error inserting mentor details", error: insertError.message });
      }

      result = newMentor;
    }

    res.status(200).json({ message: 'Mentor details saved successfully', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while processing mentor details.' });
  }
};



const scheduleMeeting = async (req, res) => {
  try {
    const { date, timeFrom, timeTo, Agenda, MeetingLink, employeeid } = req.body;

    if (!employeeid || !date || !timeFrom || !timeTo || !Agenda || !MeetingLink) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Step 1: Fetch all mentees assigned to this mentorID
    const { data: mentees, error: fetchError } = await supabase
      .from('mentee')
      .select('scholar_no, scheduled_meetings') // using scholar_no for updates
      .eq('mentorID', employeeid);

    if (fetchError) {
      console.error("Error fetching mentees:", fetchError);
      return res.status(500).json({ message: "Error fetching mentees", error: fetchError.message });
    }

    if (!mentees || mentees.length === 0) {
      return res.status(404).json({ message: "No mentees found for this mentorID." });
    }

    // Step 2: Prepare the new meeting object
    const newMeeting = { date, timeFrom, timeTo, Agenda, MeetingLink, employeeid };

    const results = [];

    // Step 3: Update each mentee's scheduled meetings
    for (const mentee of mentees) {
      const meetings = Array.isArray(mentee.scheduled_meetings) ? mentee.scheduled_meetings : [];
      const updatedMeetings = [...meetings, newMeeting].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.timeFrom}`);
        const dateB = new Date(`${b.date}T${b.timeFrom}`);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        const endTimeA = new Date(`${a.date}T${a.timeTo}`);
        const endTimeB = new Date(`${b.date}T${b.timeTo}`);
        return endTimeA - endTimeB;
      });

      const { data: updated, error: updateError } = await supabase
        .from('mentee')
        .update({ scheduled_meetings: updatedMeetings })
        .eq('scholar_no', mentee.scholar_no)
        .select();

      if (updateError) {
        console.error(`Error updating mentee ${mentee.scholar_no}:`, updateError);
        results.push({ scholar_no: mentee.scholar_no, success: false, error: updateError.message });
      } else {
        results.push({ scholar_no: mentee.scholar_no, success: true, updated });
      }
    }

    res.status(200).json({ message: "Meeting scheduled for mentees", results });
  } catch (err) {
    console.error("Unexpected error scheduling meeting:", err);
    res.status(500).json({ message: "Unexpected server error", error: err.message });
  }
};



const menteeListForMentor = async (req, res) => {
  //logic to view mentee list for mentor
}

const menteeProfileForMentor = async (req, res) => {
  //logic to view mentee profile for mentor
}

const responseToChat = async (req, res) => {
  //logic to respond to mentee Query
}

const getCertificates = async (req, res) => {
  //logic to get mentee certificates (to be handeled using certificates table).
}


export { signIn, addMentorDetails, scheduleMeeting, menteeListForMentor, menteeProfileForMentor, responseToChat, getCertificates }