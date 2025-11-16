// routes/challengeRoutes.js
const express = require("express");
const {
  createChallenge,
  getAllChallenges,
  updateChallenge,
  deleteChallenge,
  solveChallenge,
} = require("../controllers/challengeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All challenges (public)
router.get("/", getAllChallenges);

// Create new challenge (admin only)
router.post("/", protect, createChallenge);

// Solve challenge (user)
router.post("/solve/:id", protect, solveChallenge);

// Update challenge (admin)
router.put("/:id", protect, updateChallenge);

// Delete challenge (admin)
router.delete("/:id", protect, deleteChallenge);

module.exports = router;
