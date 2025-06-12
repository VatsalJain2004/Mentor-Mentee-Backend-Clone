import supabase from "../../db/database.js";
import { validateMenteeRequest } from "../../utils/utils.js";

const addPersonalMenteeDetails = async (req, res) => {
  const validated = validateMenteeRequest(req, res);
  if (!validated) return; // Stop if validation failed


  console.log(req.body); // Debugging input data

  const {
    name,
    enrollment_no,
    branch,
    faculty,
    department,
    email,
    adhaar_no,
    dob,
    blood_group,
    nationality,
    phone_no,
    telephone,
    present_address,
    permanent_address,
    profile_photo,
    scholar_no,
  } = req.body;

  try {
    // Check if scholar_no already exists as scholar_no
    const { data: existingMentee, error: fetchError } = await supabase
      .from('mentee')
      .select('*')
      .eq('scholar_no', scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking existing mentee",
          error: fetchError.message,
        });
    }

    let result;
    if (existingMentee) {
      // Update existing row
      const { data: updatedMentee, error: updateError } = await supabase
        .from("mentee")
        .update({
          name,
          enrollmentno: enrollment_no,
          branch,
          faculty,
          department,
          email,
          adhaarno: adhaar_no,
          dob,
          bloodgroup: blood_group,
          nationality,
          contactno: phone_no,
          telno: telephone,
          presentaddress: present_address,
          permanentaddress: permanent_address,
          passportphoto: profile_photo,
        })
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();

      if (updateError) {
        return res
          .status(500)
          .json({
            message: "Error updating mentee details",
            error: updateError.message,
          });
      }

      result = updatedMentee;
    } else {
      // Insert new row
      const { data: newMentee, error: insertError } = await supabase
        .from("mentee")
        .insert([
          {
            name,
            enrollmentno: enrollment_no,
            branch,
            faculty,
            department,
            email,
            adhaarno: adhaar_no,
            dob,
            bloodgroup: blood_group,
            nationality,
            contactno: phone_no,
            telno: telephone,
            presentaddress: present_address,
            permanentaddress: permanent_address,
            passportphoto: profile_photo,
            scholar_no: scholar_no
          }
        ])
        .select("*")
        .single();

      if (insertError) {
        return res
          .status(500)
          .json({
            message: "Error inserting mentee details",
            error: insertError.message,
          });
      }

      result = newMentee;
    }

    res
      .status(200)
      .json({ message: "Mentee details saved successfully", data: result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while processing mentee details." });
  }
};

const addGeneralMenteeDetails = async (req, res) => {
  console.log(req.body); // Debugging input data
  const validated = validateMenteeRequest(req, res);
  if (!validated) return; // Stop if validation failed

  const { hobbies, achievements, student_mission, student_vision, scholar_no } =
    req.body;

  try {
    // Check if scholar_no already exists as scholar_no
    const { data: existingMentee, error: fetchError } = await supabase
      .from('mentee')
      .select('*')
      .eq('scholar_no', scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking existing mentee",
          error: fetchError.message,
        });
    }

    let result;
    if (existingMentee) {
      // Update existing row
      const { data: updatedMentee, error: updateError } = await supabase
        .from("mentee")
        .update({
          hobbies,
          achievements,
          student_mission,
          student_vision,
        })
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();

      if (updateError) {
        return res
          .status(500)
          .json({
            message: "Error updating mentee details",
            error: updateError.message,
          });
      }

      result = updatedMentee;
    } else {
      // Insert new row
      const { data: newMentee, error: insertError } = await supabase
        .from("mentee")
        .insert([
          {
            hobbies,
            achievements,
            student_mission,
            student_vision,
            scholar_no: scholar_no
          }
        ])
        .select("*")
        .single();

      if (insertError) {
        return res
          .status(500)
          .json({
            message: "Error inserting mentee details",
            error: insertError.message,
          });
      }

      result = newMentee;
    }

    res
      .status(200)
      .json({ message: "Mentee details saved successfully", data: result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while processing mentee details." });
  }
};

const addMenteeGuardiansDetails = async (req, res) => {
  console.log(req.body); // Debugging input data
  const validated = validateMenteeRequest(req, res);
  if (!validated) return; // Stop if validation failed

  const {
    father_name,
    father_occupation,
    father_contactno,
    father_email,
    mother_name,
    mother_occupation,
    mother_contactno,
    mother_email,
    yearly_income,
    sibling_details,
    scholar_no,
  } = req.body;

  try {
    // Check if scholar_no already exists as scholar_no
    const { data: existingMentee, error: fetchError } = await supabase
      .from('mentee')
      .select('*')
      .eq('scholar_no', scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking existing mentee",
          error: fetchError.message,
        });
    }

    let result;
    if (existingMentee) {
      // Update existing row
      const { data: updatedMentee, error: updateError } = await supabase
        .from("mentee")
        .update({
          father_name,
          father_occupation,
          father_contactno,
          father_email,
          mother_name,
          mother_occupation,
          mother_contactno,
          mother_email,
          yearly_income,
          sibling_details,
        })
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();

      if (updateError) {
        return res
          .status(500)
          .json({
            message: "Error updating mentee details",
            error: updateError.message,
          });
      }

      result = updatedMentee;
    } else {
      // Insert new row
      const { data: newMentee, error: insertError } = await supabase
        .from("mentee")
        .insert([
          {
            father_name,
            father_occupation,
            father_contactno,
            father_email,
            mother_name,
            mother_occupation,
            mother_contactno,
            mother_email,
            yearly_income,
            sibling_details,
            scholar_no: scholar_no
          }
        ])
        .select("*")
        .single();

      if (insertError) {
        return res
          .status(500)
          .json({
            message: "Error inserting mentee details",
            error: insertError.message,
          });
      }

      result = newMentee;
    }

    res
      .status(200)
      .json({ message: "Mentee details saved successfully", data: result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while processing mentee details." });
  }
};

const addDocumentationMenteeDetails = async (req, res) => {
  console.log(req.body); // Debugging input data
  const validated = validateMenteeRequest(req, res);
  if (!validated) return; // Stop if validation failed

  const {
    antiRaggingAffidavitfilled,
    NADRegistration,
    NDLandDigilockerRegistration,
    Swayam,
    Facebook,
    YouTube,
    Twitter,
    AccSoft,
    LinkedIn,
    STL,
    Instagram,
    BusUser,
    Hosteller,
    scholar_no,
  } = req.body;

  try {
    // Check if scholar_no exists
    const { data: existingMentee, error: fetchError } = await supabase
      .from('mentee')
      .select('*')
      .eq('scholar_no', scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking existing mentee",
          error: fetchError.message,
        });
    }

    let result;
    if (existingMentee) {
      // Update existing mentee
      const { data: updatedMentee, error: updateError } = await supabase
        .from("mentee")
        .update({
          Anti_Ragging_Affidavit_filled: antiRaggingAffidavitfilled,
          NAD_Registration: NADRegistration,
          NDL_and_Digilocker_Registration: NDLandDigilockerRegistration,
          Swayam_MOOC_Registration: Swayam,
          Facebook,
          YouTube,
          Twitter,
          AccSoft,
          LinkedIn,
          STL,
          Instagram,
          Bus_User: BusUser,
          Hosteller,
        })
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();

      if (updateError) {
        return res
          .status(500)
          .json({
            message: "Error updating documentation",
            error: updateError.message,
          });
        return res
          .status(401)
          .json({
            mgpreferrrnce: "error getting the detials",
            error: updateError.message,
          });
      }

      result = updatedMentee;
    } else {
      // Insert new mentee
      const { data: newMentee, error: insertError } = await supabase
        .from("mentee")
        .insert([
          {
            scholar_no: scholar_no,
            Anti_Ragging_Affidavit_filled: antiRaggingAffidavitfilled,
            NAD_Registration: NADRegistration,
            NDL_and_Digilocker_Registration: NDLandDigilockerRegistration,
            Swayam_MOOC_Registration: Swayam,
            Facebook,
            YouTube,
            Twitter,
            AccSoft,
            LinkedIn,
            STL,
            Instagram,
            Bus_User: BusUser,
            Hosteller,
          },
        ])
        .select("*")
        .single();

      if (insertError) {
        return res
          .status(500)
          .json({
            message: "Error inserting documentation",
            error: insertError.message,
          });
      }

      result = newMentee;
    }

    res
      .status(200)
      .json({
        message: "Mentee documentation details saved successfully",
        data: result,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "An error occurred while processing documentation details.",
      });
  }
};

const addRecordofMajorAbsenceDetails = async (req, res) => {
  try {
    const { scholar_no, majorabsence } = req.body;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    if (!scholar_no || !majorabsence || !Array.isArray(majorabsence)) {
      return res.status(400).json({ message: "Invalid input data format" });
    }

    // Check if scholar_no already exists and fetch existing records
    const { data: existingRecord, error: fetchError } = await supabase
      .from("majorAbsenceRecord")
      .select("majorabsence")
      .eq("scholar_no", scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking user existence",
          error: fetchError.message,
        });
    }

    // Determine the next record number
    const existingRecords = existingRecord?.majorabsence || [];
    const lastRecordNo =
      existingRecords.length > 0
        ? Math.max(...existingRecords.map((r) => r.recordNo))
        : 0; // Get the highest record number or default to 0

    // Append new records with auto-incremented record numbers
    const newEntries = majorabsence.map((entry, index) => ({
      recordNo: lastRecordNo + index + 1, // Auto-increment based on last record number
      ...entry,
    }));

    const updatedMajorAbsence = [...existingRecords, ...newEntries];

    let response;
    if (existingRecord) {
      // Update the existing record with the new array
      response = await supabase
        .from("majorAbsenceRecord")
        .update({
          majorabsence: updatedMajorAbsence,
        })
        .eq("scholar_no", scholar_no)
        .select("*")
        .single();
    } else {
      // Insert a new row with the new absence record
      response = await supabase
        .from("majorAbsenceRecord")
        .insert([
          {
            scholar_no: scholar_no,
            majorabsence: newEntries,
          },
        ])
        .select("*")
        .single();
    }

    if (response.error) {
      return res
        .status(500)
        .json({ message: "Error saving data", error: response.error.message });
    }

    res
      .status(201)
      .json({
        message: "Major absence record saved successfully",
        data: response.data,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the record." });
  }
};

const addRecordofInDisciplinaryActionDetails = async (req, res) => {
  try {
    const { scholar_no, indisciplinaryactivities } = req.body;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    if (
      !scholar_no ||
      !indisciplinaryactivities ||
      !Array.isArray(indisciplinaryactivities)
    ) {
      return res.status(400).json({ message: "Invalid input data format" });
    }

    // Check if scholar_no already exists and fetch existing records
    const { data: existingRecord, error: fetchError } = await supabase
      .from("indisciplinaryactivities")
      .select("indisciplinaryactivities")
      .eq("scholar_no", scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking user existence",
          error: fetchError.message,
        });
    }

    // Determine the next record number
    const existingActivities = existingRecord?.indisciplinaryactivities || [];
    const lastRecordId =
      existingActivities.length > 0
        ? Math.max(...existingActivities.map((r) => r.record_id))
        : 0; // Get the highest record id or default to 0

    // Append new records with auto-incremented record ids
    const newEntries = indisciplinaryactivities.map((entry, index) => ({
      record_id: lastRecordId + index + 1, // Auto-increment based on last record id
      ...entry,
    }));

    const updatedIndisciplinaryActivities = [
      ...existingActivities,
      ...newEntries,
    ];

    let response;
    if (existingRecord) {
      // Update the existing record with the new array
      response = await supabase
        .from("indisciplinaryactivities")
        .update({
          indisciplinaryactivities: updatedIndisciplinaryActivities,
        })
        .eq("scholar_no", scholar_no)
        .select("*")
        .single();
    } else {
      // Insert a new row with the new disciplinary activity record
      response = await supabase
        .from("indisciplinaryactivities")
        .insert([
          {
            scholar_no: scholar_no,
            indisciplinaryactivities: newEntries,
          },
        ])
        .select("*")
        .single();
    }

    if (response.error) {
      return res
        .status(500)
        .json({ message: "Error saving data", error: response.error.message });
    }

    res
      .status(201)
      .json({
        message: "Indisciplinary activities record saved successfully",
        data: response.data,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the record." });
  }
};

//to be discussed
const addExamClearedDetails = async (req, res) => {
  try {
    const { scholar_no, examRecord } = req.body;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    console.log(examRecord);
    if (!scholar_no || !examRecord || typeof examRecord !== "object") {
      return res.status(400).json({ message: "Invalid input data format" });
    }

    // Check if the scholar already has an examination record
    const { data: existingRecord, error: fetchError } = await supabase
      .from("examinationscleared")
      .select("examRecord")
      .eq("scholar_no", scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking existing records",
          error: fetchError.message,
        });
    }

    let updatedExamRecord = existingRecord?.examRecord || {};

    // Function to merge without overwriting existing values
    const mergeWithoutOverwriting = (existing, incoming) => {
      if (!existing) return incoming;
      if (!incoming) return existing;

      // Only add new values if they are missing in the existing object
      Object.keys(incoming).forEach((key) => {
        if (!(key in existing) || existing[key] === null) {
          existing[key] = incoming[key];
        }
      });

      return existing;
    };

    // Merge each sub-object carefully
    updatedExamRecord["10thDetails"] = mergeWithoutOverwriting(
      updatedExamRecord["10thDetails"] || {},
      examRecord["10thDetails"]
    );

    updatedExamRecord["12thDetails"] = mergeWithoutOverwriting(
      updatedExamRecord["12thDetails"] || {},
      examRecord["12thDetails"]
    );

    updatedExamRecord["bachelorDegree"] = mergeWithoutOverwriting(
      updatedExamRecord["bachelorDegree"] || {},
      examRecord["bachelorDegree"]
    );

    updatedExamRecord["masterDegree"] = mergeWithoutOverwriting(
      updatedExamRecord["masterDegree"] || {},
      examRecord["masterDegree"]
    );

    updatedExamRecord["admission_through_JEE"] =
      updatedExamRecord["admission_through_JEE"] ??
      examRecord["admission_through_JEE"];

    let response;
    if (existingRecord) {
      // Update only if there is new information
      response = await supabase
        .from("examinationscleared")
        .update({ examRecord: updatedExamRecord })
        .eq("scholar_no", scholar_no)
        .select("*")
        .single();
    } else {
      // Insert new record
      response = await supabase
        .from("examinationscleared")
        .insert([{ scholar_no: scholar_no, examRecord }])
        .select("*")
        .single();
    }

    if (response.error) {
      return res
        .status(500)
        .json({ message: "Error saving data", error: response.error.message });
    }

    res
      .status(201)
      .json({
        message: "Examination details saved successfully",
        data: response.data,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the record." });
  }
};

const addCoCurricularDetails = async (req, res) => {
  try {
    const { scholar_no, cocurricularActivities } = req.body;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    if (
      !scholar_no ||
      !cocurricularActivities ||
      !Array.isArray(cocurricularActivities)
    ) {
      return res.status(400).json({ message: "Invalid input data format" });
    }

    // Check if the user already has co-curricular activity records
    const { data: existingRecord, error: fetchError } = await supabase
      .from("cocurricularActivities")
      .select("cocurricularActivities")
      .eq("scholar_no", scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking user existence",
          error: fetchError.message,
        });
    }

    // Fetch existing co-curricular activity details or initialize an empty array
    const existingActivities = existingRecord?.cocurricularActivities || [];

    // Process incoming data
    cocurricularActivities.forEach(async (newEntry) => {
      const { semester_number, details } = newEntry;

      if (!semester_number || !details) {
        return res.status(400).json({ message: "Invalid semester structure" });
      }

      // Find if the semester already exists
      const semesterIndex = existingActivities.findIndex(
        (s) => s.semester_number === semester_number
      );

      let updatedSemesterActivities;

      if (semesterIndex !== -1) {
        // Get the current semester activities
        updatedSemesterActivities = existingActivities[semesterIndex];

        // Determine the next record_id by looking for the highest record_id in that semester
        const nextRecordId =
          Math.max(
            ...updatedSemesterActivities.details.map((d) => d.record_id),
            0
          ) + 1; // Auto-increment record_id by 1

        // Add the new detail under the existing semester
        updatedSemesterActivities.details.push({
          record_id: nextRecordId,
          details,
        });
      } else {
        // Add a new semester with details if it doesn't exist
        updatedSemesterActivities = {
          semester_number,
          details: [
            {
              record_id: 1, // Start with record_id 1 for the first entry in this semester
              details,
            },
          ],
        };

        // Add the new semester activities to the existing list
        existingActivities.push(updatedSemesterActivities);
      }
    });

    let response;
    if (existingRecord) {
      // Update the existing co-curricular records with new semester data
      response = await supabase
        .from("cocurricularActivities")
        .update({
          cocurricularActivities: existingActivities,
        })
        .eq("scholar_no", scholar_no)
        .select("*")
        .single();
    } else {
      // Insert a new co-curricular record for the user
      response = await supabase
        .from("cocurricularActivities")
        .insert([
          {
            scholar_no: scholar_no,
            cocurricularActivities: existingActivities,
          },
        ])
        .select("*")
        .single();
    }

    if (response.error) {
      return res
        .status(500)
        .json({ message: "Error saving data", error: response.error.message });
    }

    res
      .status(201)
      .json({
        message: "Co-curricular record saved successfully",
        data: response.data,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the record." });
  }
};

const addInternshipDetails = async (req, res) => {
  try {
    const { scholar_no, internshipdetails } = req.body;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    if (
      !scholar_no ||
      !internshipdetails ||
      !Array.isArray(internshipdetails)
    ) {
      return res.status(400).json({ message: "Invalid input data format" });
    }

    // Check if the user already has internship records
    const { data: existingRecord, error: fetchError } = await supabase
      .from("internshipdetails")
      .select("internshipdetails")
      .eq("scholar_no", scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking user existence",
          error: fetchError.message,
        });
    }

    // Fetch existing internship details or initialize an empty array
    const existingInternships = existingRecord?.internshipdetails || [];

    // Determine the new record ID (incremental)
    const lastRecordId =
      existingInternships.length > 0
        ? Math.max(...existingInternships.map((i) => i.record_id))
        : 0;

    // Add record_id dynamically for new internships
    const updatedInternships = [
      ...existingInternships,
      ...internshipdetails.map((internship, index) => ({
        record_id: lastRecordId + index + 1, // Increment record_id
        ...internship,
      })),
    ];

    let response;
    if (existingRecord) {
      // Update the existing internship records
      response = await supabase
        .from("internshipdetails")
        .update({ internshipdetails: updatedInternships })
        .eq("scholar_no", scholar_no)
        .select("*")
        .single();
    } else {
      // Insert a new internship record
      response = await supabase
        .from("internshipdetails")
        .insert([
          {
            scholar_no: scholar_no,
            internshipdetails: updatedInternships,
          },
        ])
        .select("*")
        .single();
    }

    if (response.error) {
      return res
        .status(500)
        .json({ message: "Error saving data", error: response.error.message });
    }

    res
      .status(201)
      .json({
        message: "Internship record saved successfully",
        data: response.data,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the record." });
  }
};

const addSemesterWiseDetails = async (req, res) => {
  try {
    const { scholar_no, semesterrecords } = req.body;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    if (!scholar_no || !semesterrecords || !Array.isArray(semesterrecords)) {
      return res.status(400).json({ message: "Invalid input data format" });
    }

    // Check if the user already has semester records
    const { data: existingRecord, error: fetchError } = await supabase
      .from("semesterrecords")
      .select("semester_details")
      .eq("scholar_no", scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking user existence",
          error: fetchError.message,
        });
    }

    // Fetch existing semester details or initialize an empty array
    let updatedSemesters = existingRecord?.semester_details || [];

    semesterrecords.forEach((newEntry) => {
      const { semester_number, courses } = newEntry;

      if (!semester_number || !Array.isArray(courses)) {
        return res.status(400).json({ message: "Invalid semester structure" });
      }

      // Check if the semester already exists
      const semesterIndex = updatedSemesters.findIndex(
        (s) => s.semester_number === semester_number
      );

      if (semesterIndex !== -1) {
        // Semester exists, check for existing courses and avoid duplicates
        const existingCourses = updatedSemesters[semesterIndex].courses;

        courses.forEach((newCourse) => {
          const courseExists = existingCourses.some(
            (c) => c.course_code === newCourse.course_code
          );
          if (!courseExists) {
            existingCourses.push(newCourse);
          }
        });
      } else {
        // Semester does not exist, add new semester entry
        updatedSemesters.push({ semester_number, courses });
      }
    });

    let response;
    if (existingRecord) {
      // Update the existing semester records
      response = await supabase
        .from("semesterrecords")
        .update({
          semester_details: updatedSemesters,
        })
        .eq("scholar_no", scholar_no)
        .select("*")
        .single();
    } else {
      // Insert a new semester record
      response = await supabase
        .from("semesterrecords")
        .insert([
          {
            scholar_no: scholar_no,
            semester_details: semesterrecords,
          },
        ])
        .select("*")
        .single();
    }

    if (response.error) {
      return res
        .status(500)
        .json({ message: "Error saving data", error: response.error.message });
      return;
    }

    res
      .status(201)
      .json({
        message: "Semester record saved successfully",
        data: response.data,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the record." });
  }
};

const chatSupportQuery = async (res, req) => {
  //logic to chat with mentor
};

const mentorDetails = async (res, req) => {
  //logic to view Mentor Details
};

const minutesOfMeeting = async (req, res) => {
  try {
    const { scholar_no, mom_record } = req.body;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    if (!scholar_no || !mom_record || typeof mom_record !== "object") {
      return res.status(400).json({ message: "Invalid input data format" });
    }

    // Check if the scholar already has MoM records
    const { data: existingRecord, error: fetchError } = await supabase
      .from("minutesofmeeting")
      .select("mom_record")
      .eq("scholar_no", scholar_no)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res
        .status(500)
        .json({
          message: "Error checking existing records",
          error: fetchError.message,
        });
    }

    // Fetch existing MoM records or initialize an empty array
    let updatedRecords = existingRecord?.mom_record || [];

    // Ensure `record_id` is unique and incremented
    const nextRecordId =
      updatedRecords.length > 0
        ? Math.max(...updatedRecords.map((r) => r.record_id)) + 1
        : 1;

    // Assign new record ID and add to records
    mom_record.record_id = nextRecordId;
    updatedRecords.push(mom_record);

    let response;
    if (existingRecord) {
      // Update existing record
      response = await supabase
        .from("minutesofmeeting")
        .update({ mom_record: updatedRecords })
        .eq("scholar_no", scholar_no)
        .select("*")
        .single();
    } else {
      // Insert new record
      response = await supabase
        .from("minutesofmeeting")
        .insert([{ scholar_no, mom_record: [mom_record] }])
        .select("*")
        .single();
    }

    if (response.error) {
      return res
        .status(500)
        .json({ message: "Error saving data", error: response.error.message });
    }

    res
      .status(201)
      .json({
        message: "Minutes of Meeting record saved successfully",
        data: response.data,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the record." });
  }
};

const changePassword = async (req, res) => {
  const { scholar_no, currentPassword, newPassword } = req.body;

  // Input validation
  if (!scholar_no || !currentPassword || !newPassword) {
    return res
      .status(400)
      .json({
        message: "User ID, current password, and new password are required.",
      });
  }

  try {
    // Step 1: Fetch the user by scholar_no
    const { data: user, error } = await supabase
      .from("mentees") // Replace with your mentee table name
      .select("user_id, password")
      .eq("user_id", scholar_no)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Step 2: Verify the current password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }

    // Step 3: Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Step 4: Update the password in the database
    const { error: updateError } = await supabase
      .from("mentees") // Replace with your mentee table name
      .update({ password: hashedPassword })
      .eq("user_id", scholar_no);

    if (updateError) {
      return res
        .status(500)
        .json({
          message: "Failed to update password.",
          error: updateError.message,
        });
    }

    // Step 5: Respond with success
    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Error changing password:", err.message);
    res
      .status(500)
      .json({ message: "An error occurred while changing the password." });
  }
};




const scheduleAppointments = async (req, res) => {
  const { scholar_no, appointment } = req.body;
  const validated = validateMenteeRequest(req, res);
  if (!validated) return; // Stop if validation failed

  if (
    !scholar_no ||
    !appointment ||
    !appointment.date ||
    !appointment.time ||
    !appointment.purpose
  ) {
    return res
      .status(400)
      .json({ message: 'Missing required appointment fields.' });
  }

  try {
    // 1. Find the mentor whose mentees array includes this scholar_no
    const { data: mentorData, error: fetchError } = await supabase
      .from('mentor')
      .select('employeeid, appointments')
      .contains('mentees', [scholar_no])
      .single();

    if (fetchError || !mentorData) {
      return res.status(404).json({
        message: 'No mentor found with the given scholar number',
        error: fetchError?.message,
      });
    }

    const existingAppointments = mentorData.appointments || [];

    // 2. Inject scholar_no into appointment object
    const appointmentWithScholar = {
      ...appointment,
      scholar_no: scholar_no.toString(), // store as string for consistency
    };

    // 3. Add the new appointment and sort the entire list
    const updatedAppointments = [...existingAppointments, appointmentWithScholar].sort(
      (a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA - dateTimeB; // ascending
      }
    );

    // 4. Update the mentor's appointments
    const { data: updateData, error: updateError } = await supabase
      .from('mentor')
      .update({ appointments: updatedAppointments })
      .eq('employeeid', mentorData.employeeid)
      .select('appointments')
      .single();

    if (updateError) {
      return res.status(500).json({
        message: 'Failed to update appointments',
        error: updateError.message,
      });
    }

    res.status(200).json({
      message: 'Appointment scheduled successfully',
      appointments: updateData.appointments,
    });
  } catch (err) {
    console.error('Error scheduling appointment:', err);
    res.status(500).json({ message: 'Server error', error: err.message || err });
  }
};




export {
  addPersonalMenteeDetails,
  addGeneralMenteeDetails,
  addMenteeGuardiansDetails,
  addDocumentationMenteeDetails,
  addRecordofMajorAbsenceDetails,
  addExamClearedDetails,
  addCoCurricularDetails,
  addInternshipDetails,
  addSemesterWiseDetails,
  addRecordofInDisciplinaryActionDetails,
  chatSupportQuery,
  mentorDetails,
  minutesOfMeeting,
  changePassword,
  scheduleAppointments
};
