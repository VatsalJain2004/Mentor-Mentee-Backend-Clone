import express from 'express';

import {
  addMentorDetails,
  menteeListForMentor,
  menteeProfileForMentor,
  responseToChat,
  getCertificates,
  scheduleMeeting
} from '../controllers/mentor/post.controller.js';

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

const router = express.Router();

// post mentor controller
router.post("/addMentorDetails", addMentorDetails);
router.get("/menteeListForMentor", menteeListForMentor);
router.post("/menteeProfileForMentor", menteeProfileForMentor);
router.post("/responseToChat", responseToChat);
router.post("/getCertificates", getCertificates);
router.post("/scheduleMeeting", scheduleMeeting);

//edit controller
router.post("/editPersonalMenteeDetails", editPersonalMenteeDetails);
router.post("/editDocumentationMenteeDetails", editDocumentationMenteeDetails);
router.post(
  "/editRecordofMajorAbsenceDetails",
  editRecordofMajorAbsenceDetails
);
router.post(
  "/editRecordofInDisciplinaryActionDetails",
  editIndisciplinaryActionDetails
);

router.post("/editExamClearedDetails", editExamClearedDetails);
router.post("/editCoCurricularDetails", editCoCurricularDetails);
router.post("/editInternshipDetails", editInternshipDetails);
router.post("/editSemesterWiseDetails", editSemesterDetails);

export { router };
