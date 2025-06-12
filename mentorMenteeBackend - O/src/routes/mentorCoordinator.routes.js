import express from 'express';
import { uploadMentorList } from '../controllers/mentorCoordinator/post.controller.js';
import { getMentorsWithMentees, getMenteesWithMentors } from '../controllers/mentorCoordinator/get.controller.js';
import { assignMentorToMentee, assignMenteesToMentor } from '../controllers/mentorCoordinator/edit.controller.js';
import { deleteMentor, deleteMenteeFromMentor } from '../controllers/mentorCoordinator/delete.controller.js';

const router = express.Router();

// POST route to upload mentor list
router.post("/upload/mentors", uploadMentorList);

// GET routes (return JSON response)
router.get("/mentors", getMentorsWithMentees);       // Get list of mentors with mentees
router.get("/mentees", getMenteesWithMentors);       // Get list of mentees with mentors

// DELETE routes (accept JSON body with required data)
router.delete("/delete/mentor", deleteMentor);   // Delete a mentor and clean up related data
router.delete("/delete/mentee", deleteMenteeFromMentor);   // Delete a mentee from a specific mentor

// PUT routes (update relationships; accept JSON body with data)
router.put("/assign/mentor", assignMentorToMentee);   // Assign a mentor to a mentee
router.put("/assign/mentees", assignMenteesToMentor);  // Assign multiple mentees to a mentor

export { router };