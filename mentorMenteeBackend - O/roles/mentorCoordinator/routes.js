const express = require("express");
const { uploadMentorList } = require("./postController");
const { getMentorsWithMentees, getMenteesWithMentors } = require("./getController");
const { assignMentorToMentee, assignMenteesToMentor } = require("./editController");
const { deleteMentor, deleteMenteeFromMentor } = require("./deleteController");

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

module.exports = router;
