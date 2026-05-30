const express = require("express");
const User = require("../model/userSchema");

const router = express.Router();

// GET Leaderboard
router.get("/", async (req, res) => {
  try {
    // Sort users by points (highest → lowest)
    const users = await User.find()
      .select("username userprofile points")
      .sort({ points: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
