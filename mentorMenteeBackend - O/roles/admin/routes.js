const express = require('express');
const { uploadUsers, assignMenteeToMentor, viewMenteeProfile, viewMentorProfile } = require('./postController');
const { getMentorCoordinatorWithMentors, getMentorsWithMentees, getMenteesFromMentorList } = require('./getController');

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

module.exports = router;
