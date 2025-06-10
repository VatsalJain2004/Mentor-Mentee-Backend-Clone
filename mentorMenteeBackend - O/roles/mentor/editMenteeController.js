const supabase = require('../../common/database');


const editPersonalMenteeDetails = async (req, res) => {
    try {
      const { userId } = req.params;
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
        profile_photo
      } = req.body;
  
      // Update mentee details by userId (scholarno)
      const { data, error } = await supabase
        .from('mentee')
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
          passportphoto: profile_photo
        })
        .eq('scholarno', userId)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error updating mentee details', error: error.message });
      }
  
      res.status(200).json({ message: 'Mentee details updated successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while updating mentee details.' });
    }
  };



  const editDocumentationMenteeDetails = async (req, res) => {
    try {
      const { userId } = req.params;
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
        Hosteller
      } = req.body;
  
      // Update mentee documentation details by userId (scholarno)
      const { data, error } = await supabase
        .from('mentee')
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
          Hosteller
        })
        .eq('scholarno', userId)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error updating mentee documentation details', error: error.message });
      }
  
      res.status(200).json({ message: 'Mentee documentation details updated successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while updating mentee documentation details.' });
    }
  };


  const editRecordofMajorAbsenceDetails = async (req, res) => {
    try {
      const { userId } = req.params;
      const { majorabsence } = req.body;
  
      if (!majorabsence || !Array.isArray(majorabsence)) {
        return res.status(400).json({ message: 'Invalid input data format' });
      }
  
      // Fetch existing record
      const { data: existingRecord, error: fetchError } = await supabase
        .from('majorAbsenceRecord')
        .select('majorabsence')
        .eq('scholar_no', userId)
        .single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        return res.status(500).json({ message: 'Error fetching major absence record', error: fetchError.message });
      }
  
      if (!existingRecord) {
        return res.status(404).json({ message: 'Major absence record not found' });
      }
  
      const updatedRecord = {
        majorabsence
      };
  
      // Update major absence record with the new data
      const { data, error } = await supabase
        .from('majorAbsenceRecord')
        .update(updatedRecord)
        .eq('scholar_no', userId)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error updating major absence record', error: error.message });
      }
  
      res.status(200).json({ message: 'Major absence record updated successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while updating major absence record details.' });
    }
  };


  const editIndisciplinaryActionDetails = async (req, res) => {
    try {
      const { userId } = req.params;
      const { indisciplinaryactivities } = req.body;
  
      if (!indisciplinaryactivities || !Array.isArray(indisciplinaryactivities)) {
        return res.status(400).json({ message: 'Invalid input data format' });
      }
  
      // Fetch existing records
      const { data: existingRecord, error: fetchError } = await supabase
        .from('indisciplinaryactivities')
        .select('indisciplinaryactivities')
        .eq('scholar_no', userId)
        .single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        return res.status(500).json({ message: "Error checking user existence", error: fetchError.message });
      }
  
      if (!existingRecord) {
        return res.status(404).json({ message: 'No disciplinary action record found for this user' });
      }
  
      // Determine the last record id
      const existingActivities = existingRecord?.indisciplinaryactivities || [];
      const lastRecordId = existingActivities.length > 0 
        ? Math.max(...existingActivities.map(r => r.record_id)) 
        : 0;
  
      // Append new records with auto-incremented record ids
      const newEntries = indisciplinaryactivities.map((entry, index) => ({
        record_id: lastRecordId + index + 1,
        ...entry
      }));
  
      const updatedIndisciplinaryActivities = [...existingActivities, ...newEntries];
  
      // Update disciplinary records in the database
      const { data, error } = await supabase
        .from('indisciplinaryactivities')
        .update({
          indisciplinaryactivities: updatedIndisciplinaryActivities
        })
        .eq('scholar_no', userId)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error updating disciplinary action record', error: error.message });
      }
  
      res.status(200).json({ message: 'Disciplinary action record updated successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while updating disciplinary action record details.' });
    }
  };


  const editExamClearedDetails = async (req, res) => {
    try {
      const { scholar_no } = req.params;
      const { examRecord } = req.body;
  
      if (!scholar_no || !examRecord || typeof examRecord !== 'object') {
        return res.status(400).json({ message: "Invalid input data" });
      }
  
      const { data: existingRecord, error: fetchError } = await supabase
        .from('examinationscleared')
        .select('examRecord')
        .eq('scholar_no', scholar_no)
        .single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        return res.status(500).json({ message: "Error fetching record", error: fetchError.message });
      }
  
      if (!existingRecord) {
        return res.status(404).json({ message: "No record found for this scholar number" });
      }
  
      // Merge updated data with existing data
      const updatedExamRecord = { ...existingRecord.examRecord, ...examRecord };
  
      const { data, error } = await supabase
        .from('examinationscleared')
        .update({ examRecord: updatedExamRecord })
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: "Error updating data", error: error.message });
      }
  
      res.status(200).json({ message: "Examination details updated successfully", data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while updating the record." });
    }
  };
  


  const editCoCurricularDetails = async (req, res) => {
    try {
      const { userId } = req.params;
      const { cocurricularActivities } = req.body;
  
      if (!cocurricularActivities || !Array.isArray(cocurricularActivities)) {
        return res.status(400).json({ message: 'Invalid input data format' });
      }
  
      // Fetch existing record
      const { data: existingRecord, error: fetchError } = await supabase
        .from('cocurricularActivities')
        .select('cocurricularActivities')
        .eq('scholar_no', userId)
        .single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        return res.status(500).json({ message: 'Error fetching co-curricular record', error: fetchError.message });
      }
  
      if (!existingRecord) {
        return res.status(404).json({ message: 'Co-curricular record not found' });
      }
  
      // Replace the existing activities with the new ones
      const updatedRecord = {
        cocurricularActivities
      };
  
      // Update co-curricular activities with new data
      const { data, error } = await supabase
        .from('cocurricularActivities')
        .update(updatedRecord)
        .eq('scholar_no', userId)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error updating co-curricular record', error: error.message });
      }
  
      res.status(200).json({ message: 'Co-curricular record updated successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while updating co-curricular record details.' });
    }
  };
  
  const editInternshipDetails = async (req, res) => {
    try {
      const { userId } = req.params;
      const { internshipdetails } = req.body;
  
      if (!internshipdetails || !Array.isArray(internshipdetails)) {
        return res.status(400).json({ message: 'Invalid input data format' });
      }
  
      // Fetch existing record
      const { data: existingRecord, error: fetchError } = await supabase
        .from('internshipdetails')
        .select('internshipdetails')
        .eq('scholar_no', userId)
        .single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        return res.status(500).json({ message: 'Error fetching internship record', error: fetchError.message });
      }
  
      if (!existingRecord) {
        return res.status(404).json({ message: 'Internship record not found' });
      }
  
      // Replace the existing internship details with the new ones
      const updatedRecord = {
        internshipdetails
      };
  
      // Update internship details
      const { data, error } = await supabase
        .from('internshipdetails')
        .update(updatedRecord)
        .eq('scholar_no', userId)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error updating internship record', error: error.message });
      }
  
      res.status(200).json({ message: 'Internship record updated successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while updating internship record details.' });
    }
  };


  const editSemesterDetails = async (req, res) => {
    try {
      const { userId } = req.params;
      const { semesterrecords } = req.body;
  
      if (!semesterrecords || !Array.isArray(semesterrecords)) {
        return res.status(400).json({ message: 'Invalid input data format' });
      }
  
      // Fetch existing semester records
      const { data: existingRecord, error: fetchError } = await supabase
        .from('semesterrecords')
        .select('semester_details')
        .eq('scholar_no', userId)
        .single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        return res.status(500).json({ message: 'Error fetching semester record', error: fetchError.message });
      }
  
      if (!existingRecord) {
        return res.status(404).json({ message: 'Semester record not found' });
      }
  
      // Update the semester records with new data
      let updatedSemesters = existingRecord.semester_details;
  
      semesterrecords.forEach((newEntry) => {
        const { semester_number, courses } = newEntry;
  
        if (!semester_number || !Array.isArray(courses)) {
          return res.status(400).json({ message: 'Invalid semester structure' });
        }
  
        // Find if the semester already exists
        const semesterIndex = updatedSemesters.findIndex(s => s.semester_number === semester_number);
  
        if (semesterIndex !== -1) {
          // Semester exists, add new courses
          const existingCourses = updatedSemesters[semesterIndex].courses;
  
          courses.forEach((newCourse) => {
            const courseExists = existingCourses.some(c => c.course_code === newCourse.course_code);
            if (!courseExists) {
              existingCourses.push(newCourse);
            }
          });
        } else {
          // Semester does not exist, add new semester entry
          updatedSemesters.push({ semester_number, courses });
        }
      });
  
      // Update semester records in the database
      const { data, error } = await supabase
        .from('semesterrecords')
        .update({ semester_details: updatedSemesters })
        .eq('scholar_no', userId)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error updating semester record', error: error.message });
      }
  
      res.status(200).json({ message: 'Semester record updated successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while updating semester record details.' });
    }
  };


  module.exports = { editCoCurricularDetails, editDocumentationMenteeDetails, editIndisciplinaryActionDetails, editExamClearedDetails, editInternshipDetails, editPersonalMenteeDetails, editRecordofMajorAbsenceDetails, editSemesterDetails };