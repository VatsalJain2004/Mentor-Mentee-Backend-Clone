const supabase = require('../../common/database');
const { validateMenteeRequest } = require("../../common/utils");


const deletePersonalMenteeDetails = async (req, res) => {
    try {
      const { scholar_no } = req.query;
      const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed
  
      // Delete mentee details by scholar_no (scholarno)
      const { data, error } = await supabase
        .from('mentee')
        .delete()
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error deleting mentee details', error: error.message });
      }
  
      if (!data) {
        return res.status(404).json({ message: 'Mentee not found' });
      }
  
      res.status(200).json({ message: 'Mentee details deleted successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while deleting mentee details.' });
    }
  };



const deleteDocumentationMenteeDetails = async (req, res) => {
  try {
    const { scholar_no } = req.query;
    const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed

    // Delete mentee documentation details by scholar_no (scholarno)
    const { data, error } = await supabase
      .from('mentee')
      .delete()
      .eq('scholar_no', scholar_no)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ message: 'Error deleting mentee documentation details', error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: 'Mentee documentation not found' });
    }

    res.status(200).json({ message: 'Mentee documentation details deleted successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting mentee documentation details.' });
  }
};

  


const deleteRecordofMajorAbsenceDetails = async (req, res) => {
    try {
      const { scholar_no } = req.query;
      const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed
  
      // Delete major absence record by scholar_no (scholar_no)
      const { data, error } = await supabase
        .from('majorAbsenceRecord')
        .delete()
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error deleting major absence record', error: error.message });
      }
  
      if (!data) {
        return res.status(404).json({ message: 'Major absence record not found' });
      }
  
      res.status(200).json({ message: 'Major absence record deleted successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while deleting major absence record details.' });
    }
  };


  const deleteIndisciplinaryActionDetails = async (req, res) => {
    try {
      const { scholar_no } = req.query;
      const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed
  
      // Delete disciplinary action record by scholar_no (scholar_no)
      const { data, error } = await supabase
        .from('indisciplinaryactivities')
        .delete()
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error deleting disciplinary action record', error: error.message });
      }
  
      if (!data) {
        return res.status(404).json({ message: 'No disciplinary action record found for this user' });
      }
  
      res.status(200).json({ message: 'Disciplinary action record deleted successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while deleting disciplinary action record details.' });
    }
  };



  const deleteExamClearedDetails = async (req, res) => {
    try {
      const { scholar_no } = req.query;
      const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed
  
      if (!scholar_no) {
        return res.status(400).json({ message: "Scholar number is required" });
      }
  
      const { error } = await supabase
        .from('examinationscleared')
        .delete()
        .eq('scholar_no', scholar_no);
  
      if (error) {
        return res.status(500).json({ message: "Error deleting data", error: error.message });
      }
  
      res.status(200).json({ message: "Examination record deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while deleting the record." });
    }
  };  
  


  const deleteCoCurricularDetails = async (req, res) => {
    try {
      const { scholar_no } = req.query;
      const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed
    
  
      // Delete co-curricular activity record by scholar_no (scholar_no)
      const { data, error } = await supabase
        .from('cocurricularActivities')
        .delete()
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error deleting co-curricular record', error: error.message });
      }
  
      if (!data) {
        return res.status(404).json({ message: 'Co-curricular record not found' });
      }
  
      res.status(200).json({ message: 'Co-curricular record deleted successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while deleting co-curricular record details.' });
    }
  };
  
  
  const deleteInternshipDetails = async (req, res) => {
    try {
      const { scholar_no } = req.query;
      const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed
  
      // Delete internship record by scholar_no (scholar_no)
      const { data, error } = await supabase
        .from('internshipdetails')
        .delete()
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error deleting internship record', error: error.message });
      }
  
      if (!data) {
        return res.status(404).json({ message: 'Internship record not found' });
      }
  
      res.status(200).json({ message: 'Internship record deleted successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while deleting internship record details.' });
    }
  };
  
  

  const deleteSemesterDetails = async (req, res) => {
    try {
      const { scholar_no } = req.query;
      const validated = validateMenteeRequest(req, res);
    if (!validated) return; // Stop if validation failed
  
      // Delete semester record by scholar_no (scholar_no)
      const { data, error } = await supabase
        .from('semesterrecords')
        .delete()
        .eq('scholar_no', scholar_no)
        .select('*')
        .single();
  
      if (error) {
        return res.status(500).json({ message: 'Error deleting semester record', error: error.message });
      }
  
      if (!data) {
        return res.status(404).json({ message: 'Semester record not found' });
      }
  
      res.status(200).json({ message: 'Semester record deleted successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while deleting semester record details.' });
    }
  };


  module.exports = { deleteCoCurricularDetails, deleteDocumentationMenteeDetails, deleteIndisciplinaryActionDetails, deleteExamClearedDetails, deleteInternshipDetails, deletePersonalMenteeDetails, deleteRecordofMajorAbsenceDetails, deleteSemesterDetails };