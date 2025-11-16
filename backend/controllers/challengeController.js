// controllers/challengeController.js
const Challenge = require("../model/challengeSchema");
const User = require("../model/userSchema");
const mongoose = require("mongoose");

// ------------------------------------------
// CREATE CHALLENGE  (ADMIN)
// ------------------------------------------
const createChallenge = async (req, res) => {
  try {
    const { title, description, points, options, correct } = req.body;

    const challenge = await Challenge.create({
      title,
      description,
      points,
      options,
      correct,
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json({
      success: true,
      message: "Challenge created!",
      challenge,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------
// GET ALL CHALLENGES
// ------------------------------------------
const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json({ success: true, challenges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------
// UPDATE CHALLENGE (ADMIN)
// ------------------------------------------
const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Challenge updated",
      challenge,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------
// DELETE CHALLENGE (ADMIN)
// ------------------------------------------
const deleteChallenge = async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Challenge deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------------------
// SOLVE CHALLENGE (USER)
// ------------------------------------------
const solveChallenge = async (req, res) => {
  try {
    const challengeId = req.params.id;       // route: /solve/:id
    const { selectedOption } = req.body;
    const userId = req.user && (req.user._id || req.user.id);

    // Validate IDs
    if (!challengeId || !mongoose.Types.ObjectId.isValid(challengeId)) {
      return res.status(400).json({ success: false, message: "Invalid challenge id" });
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }

    // Find challenge
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    // Find user (fresh)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Already solved check (compare ids)
    const alreadySolved = user.solvedChallenges.some(
      (c) => c.challengeId && c.challengeId.toString() === challengeId.toString()
    );

    if (alreadySolved) {
      return res.status(400).json({ success: false, message: "Challenge already solved" });
    }

    // Check answer and compute points
    const isCorrect = challenge.correct === selectedOption;
    const pointsEarned = isCorrect ? Number(challenge.points || 0) : 0;

    // Save the attempt into user's solvedChallenges array
    user.solvedChallenges.push({
      challengeId,
      isCorrect,
      pointsEarned,
    });

    // Ensure points field exists
    user.points = (user.points || 0) + pointsEarned;
    await user.save();

    // Respond with useful info for frontend
    return res.status(200).json({
      success: true,
      isCorrect,
      pointsEarned,
      totalPoints: user.points,
      solvedChallenges: user.solvedChallenges,
      message: isCorrect ? "Correct answer!" : "Wrong answer!"
    });

  } catch (error) {
    console.error("SOLVE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createChallenge,
  getAllChallenges,
  updateChallenge,
  deleteChallenge,
  solveChallenge,
};
