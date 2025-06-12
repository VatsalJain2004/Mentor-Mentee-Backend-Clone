// route.js
import express from 'express';
import {
  addPersonalMenteeDetails,
  chatSupportQuery,
  mentorDetails,
  minutesOfMeeting,
  addDocumentationMenteeDetails,
  addRecordofMajorAbsenceDetails,
  addExamClearedDetails,
  addCoCurricularDetails,
  addInternshipDetails,
  addSemesterWiseDetails,
  addRecordofInDisciplinaryActionDetails,
  changePassword,
  addMenteeGuardiansDetails,
  scheduleAppointments
} from '../controllers/mentee/post.controller.js';

import {
  editPersonalMenteeDetails,
  editDocumentationMenteeDetails,
  editIndisciplinaryActionDetails,
  editInternshipDetails,
  editRecordofMajorAbsenceDetails,
  editSemesterDetails,
  editCoCurricularDetails,
  editExamClearedDetails,
} from '../controllers/mentee/edit.controller.js';

import {
  getPersonalMenteeDetails,
  getDocumentationMenteeDetails,
  getCoCurricularDetails,
  getIndisciplinaryActionDetails,
  getInternshipDetails,
  getRecordofMajorAbsenceDetails,
  getSemesterDetails,
  getExamClearedDetails,
  getMinutesOfMeeting,
  getScheduledMeeting
} from '../controllers/mentee/get.controller.js';

import {
  deletePersonalMenteeDetails,
  deleteDocumentationMenteeDetails,
  deleteCoCurricularDetails,
  deleteIndisciplinaryActionDetails,
  deleteInternshipDetails,
  deleteRecordofMajorAbsenceDetails,
  deleteExamClearedDetails,
} from '../controllers/mentee/delete.controller.js';

// Import the middleware
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply authenticateToken middleware to the routes that require authentication

// Post routes (add new details)
router.post("/addPersonalMenteeDetails", authenticateToken, addPersonalMenteeDetails);
router.post("/addMenteeGuardiansDetails", authenticateToken, addMenteeGuardiansDetails);
router.post("/addDocumentationMenteeDetails", authenticateToken, addDocumentationMenteeDetails);
router.post("/addRecordofMajorAbsenceDetails", authenticateToken, addRecordofMajorAbsenceDetails);
router.post("/addRecordofInDisciplinaryActionDetails", authenticateToken, addRecordofInDisciplinaryActionDetails);
router.post("/scheduleAppointments", authenticateToken, scheduleAppointments);

router.post("/addExamClearedDetails", authenticateToken, addExamClearedDetails);
router.post("/addCoCurricularDetails", authenticateToken, addCoCurricularDetails);
router.post("/addInternshipDetails", authenticateToken, addInternshipDetails);
router.post("/addSemesterWiseDetails", authenticateToken, addSemesterWiseDetails);

router.post("/chatSupportQuery", authenticateToken, chatSupportQuery);
router.get("/mentorDetails", authenticateToken, mentorDetails);
router.post("/minutesOfMeeting", authenticateToken, minutesOfMeeting);
router.post("/changePassword", authenticateToken, changePassword);

// Edit routes (update existing details)
router.put("/editPersonalMenteeDetails", authenticateToken, editPersonalMenteeDetails);
router.put("/editDocumentationMenteeDetails", authenticateToken, editDocumentationMenteeDetails);
router.put("/editRecordofMajorAbsenceDetails", authenticateToken, editRecordofMajorAbsenceDetails);
router.put("/editRecordofInDisciplinaryActionDetails", authenticateToken, editIndisciplinaryActionDetails);

router.put("/editExamClearedDetails", authenticateToken, editExamClearedDetails);
router.put("/editCoCurricularDetails", authenticateToken, editCoCurricularDetails);
router.put("/editInternshipDetails", authenticateToken, editInternshipDetails);
router.put("/editSemesterWiseDetails", authenticateToken, editSemesterDetails);

// Get routes (fetch details)
router.get("/getPersonalMenteeDetails", authenticateToken, getPersonalMenteeDetails);
router.get("/getDocumentationMenteeDetails", authenticateToken, getDocumentationMenteeDetails);
router.get("/getRecordofMajorAbsenceDetails", authenticateToken, getRecordofMajorAbsenceDetails);
router.get("/getRecordofInDisciplinaryActionDetails", authenticateToken, getIndisciplinaryActionDetails);

router.get("/getExamClearedDetails", authenticateToken, getExamClearedDetails);
router.get("/getCoCurricularDetails", authenticateToken, getCoCurricularDetails);
router.get("/getInternshipDetails", authenticateToken, getInternshipDetails);
router.get("/getMinutesOfMeeting", authenticateToken, getMinutesOfMeeting);
router.get("/getSemesterWiseDetails", authenticateToken, getSemesterDetails);
router.get("/getScheduledMeeting", authenticateToken, getScheduledMeeting);

// Delete routes (delete existing details)
router.delete("/deletePersonalMenteeDetails", authenticateToken, deletePersonalMenteeDetails);
router.delete("/deleteDocumentationMenteeDetails", authenticateToken, deleteDocumentationMenteeDetails);
router.delete("/deleteRecordofMajorAbsenceDetails", authenticateToken, deleteRecordofMajorAbsenceDetails);
router.delete("/deleteRecordofInDisciplinaryActionDetails", authenticateToken, deleteIndisciplinaryActionDetails);
router.delete("/deleteExamClearedDetails", authenticateToken, deleteExamClearedDetails);
router.delete("/deleteCoCurricularDetails", authenticateToken, deleteCoCurricularDetails);
router.delete("/deleteInternshipDetails", authenticateToken, deleteInternshipDetails);

export { router };
