import express from 'express';
import { uploadUsers, assignMenteeToMentor, viewMenteeProfile, viewMentorProfile } from '../controllers/admin/post.controller.js';
import { getMentorCoordinatorWithMentors, getMentorsWithMentees, getMenteesFromMentorList } from '../controllers/admin/get.controller.js';

const router = express.Router();

//POST Routes
router.post('/uploadUsers', uploadUsers);
router.post('/assignMenteeToMentor', assignMenteeToMentor);
router.post('/viewMenteeProfile', viewMenteeProfile);
router.post('/viewMentorProfile', viewMentorProfile);

//GET Routes
router.get('/mentorCoordinatorWithMentors', getMentorCoordinatorWithMentors);
router.get('/mentorsWithMentees', getMentorsWithMentees);
router.get('/menteesFromMentorList', getMenteesFromMentorList);

export { router }