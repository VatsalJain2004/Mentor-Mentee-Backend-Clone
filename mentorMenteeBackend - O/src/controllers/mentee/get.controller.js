import supabase from "../../db/database.js";
import { validateMenteeRequest } from "../../utils/utils.js";

const getPersonalMenteeDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query; // Extract both scholar_no and role from query parameters
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    // Log for debugging
    console.log("Fetching details for scholar_no:", scholar_no);

    // Fetch mentee details by scholar_no
    const { data, error } = await supabase
      .from("mentee")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        message: "Error fetching mentee details",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({ message: "Mentee not found" });
    }

    res.status(200).json({ message: "Mentee details fetched successfully", data });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "An error occurred while fetching mentee details." });
  }
};


const getDocumentationMenteeDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query; // Extract both scholar_no and role from query parameters
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    // Fetch mentee documentation details by userId (scholarno)
    const { data, error } = await supabase
      .from("mentee")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      return res.status(500).json({
        message: "Error fetching mentee documentation details",
        error: error.message,
      });
    }

    if (!data) {
      return res
        .status(404)
        .json({ message: "Mentee documentation not found" });
    }

    res
      .status(200)
      .json({ message: "Mentee documentation fetched successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching mentee documentation details.",
    });
  }
};

const getRecordofMajorAbsenceDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    console.log("Received request for scholar_no:", scholar_no);

    // Fetch major absence record details by userId (scholar_no)
    const { data, error } = await supabase
      .from("majorAbsenceRecord")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      return res.status(500).json({
        message: "Error fetching major absence records",
        error: error.message,
      });
    }

    if (!data) {
      return res
        .status(404)
        .json({ message: "Major absence record not found" });
    }

    res
      .status(200)
      .json({ message: "Major absence record fetched successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching major absence record details.",
    });
  }
};

const getIndisciplinaryActionDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    console.log("Received request for scholar_no:", scholar_no);

    // Fetch disciplinary action details by userId (scholar_no)
    const { data, error } = await supabase
      .from("indisciplinaryactivities")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      return res.status(500).json({
        message: "Error fetching disciplinary action records",
        error: error.message,
      });
    }

    if (!data) {
      return res
        .status(404)
        .json({ message: "No disciplinary action record found for this user" });
    }

    res.status(200).json({
      message: "Disciplinary action record fetched successfully",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while fetching disciplinary action record details.",
    });
  }
};

const getExamClearedDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    if (!scholar_no) {
      return res.status(400).json({ message: "Scholar number is required" });
    }

    const { data, error } = await supabase
      .from("examinationscleared")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error && error.code !== "PGRST116") {
      return res
        .status(500)
        .json({ message: "Error fetching data", error: error.message });
    }

    if (!data) {
      return res
        .status(404)
        .json({ message: "No record found for this scholar number" });
    }

    res.status(200).json({ message: "Data fetched successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};

const getCoCurricularDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    // Fetch co-curricular activity details by userId (scholar_no)
    const { data, error } = await supabase
      .from("cocurricularActivities")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      return res.status(500).json({
        message: "Error fetching co-curricular records",
        error: error.message,
      });
    }

    if (!data) {
      return res
        .status(404)
        .json({ message: "Co-curricular record not found" });
    }

    res
      .status(200)
      .json({ message: "Co-curricular record fetched successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching co-curricular record details.",
    });
  }
};

const getInternshipDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    // Fetch internship details by userId (scholar_no)
    const { data, error } = await supabase
      .from("internshipdetails")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      return res.status(500).json({
        message: "Error fetching internship records",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({ message: "Internship record not found" });
    }

    res
      .status(200)
      .json({ message: "Internship record fetched successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching internship record details.",
    });
  }
};

const getMinutesOfMeeting = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    console.log("Received request for scholar_no:", scholar_no); // Debugging

    if (!scholar_no) {
      return res.status(400).json({ message: "Scholar number is required" });
    }

    const { data, error } = await supabase
      .from("minutesofmeeting")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res
        .status(500)
        .json({ message: "Error fetching data", error: error.message });
    }

    if (!data) {
      return res
        .status(404)
        .json({ message: "No records found for this scholar number" });
    }

    console.log("Fetched data:", data); // Debugging
    res
      .status(200)
      .json({ message: "MoM records retrieved successfully", data });
  } catch (err) {
    console.error("Error in API:", err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the record." });
  }
};

const getSemesterDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    // Fetch semester details by userId (scholar_no)
    const { data, error } = await supabase
      .from("semesterrecords")
      .select("*")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      return res.status(500).json({
        message: "Error fetching semester records",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({ message: "Semester record not found" });
    }

    res
      .status(200)
      .json({ message: "Semester record fetched successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching semester record details.",
    });
  }
};


const getScheduledMeeting = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    if (!scholar_no) {
      return res.status(400).json({ message: "Missing scholar_no" });
    }

    // Fetch mentee record
    const { data: mentee, error } = await supabase
      .from("mentee")
      .select("scheduled_meetings")
      .eq("scholar_no", scholar_no)
      .single();

    if (error) {
      console.error("Error fetching mentee:", error);
      return res.status(500).json({ message: "Failed to fetch mentee", error: error.message });
    }

    const meetings = mentee?.scheduled_meetings;

    if (!meetings || meetings.length === 0) {
      return res.status(404).json({ message: "No meetings found" });
    }

    // Filter future meetings and sort by date + time
    const now = new Date();
    const upcomingMeetings = meetings
      .filter((meeting) => {
        const startDate = new Date(`${meeting.date}T${meeting.timeFrom}`);
        return startDate >= now;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.timeFrom}`);
        const dateB = new Date(`${b.date}T${b.timeFrom}`);
        return dateA - dateB;
      });

    const latestMeeting = upcomingMeetings[0];

    if (!latestMeeting) {
      return res.status(404).json({ message: "No upcoming meetings found" });
    }

    return res.status(200).json({ latestMeeting });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export {
  getPersonalMenteeDetails,
  getCoCurricularDetails,
  getDocumentationMenteeDetails,
  getIndisciplinaryActionDetails,
  getExamClearedDetails,
  getInternshipDetails,
  getRecordofMajorAbsenceDetails,
  getMinutesOfMeeting,
  getSemesterDetails,
  getScheduledMeeting
};
