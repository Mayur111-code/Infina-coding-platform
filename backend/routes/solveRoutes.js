const express = require("express");
const router = express.Router();
const { solveChallenge } = require("../controllers/solveController");
const protect = require("../middleware/authMiddleware");

router.post("/solve/:challengeId", protect, solveChallenge);

module.exports = router;
