const Challenge = require("../model/challengeSchema");
const User = require("../model/userSchema");

const solveChallenge = async (req, res) => {
  try {
    const challengeId = req.params.id;   // 👈 Correct param name
    const { selectedOption } = req.body;
    const userId = req.user._id;

    // 1️⃣ Find challenge
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    // 2️⃣ Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 3️⃣ Prevent duplicate solve
    const alreadySolved = user.solvedChallenges.find(
      (c) => c.challengeId.toString() === challengeId
    );

    if (alreadySolved) {
      return res.status(400).json({
        success: false,
        message: "You already solved this challenge!",
      });
    }

    // 4️⃣ Check correct answer
    const isCorrect = challenge.correct === selectedOption;
    const pointsEarned = isCorrect ? challenge.points : 0;

    // 5️⃣ Save solved challenge in user
    user.solvedChallenges.push({
      challengeId,
      isCorrect,
      pointsEarned,
    });

    // 6️⃣ Add points to user (correct schema field = points)
    user.points = (user.points || 0) + pointsEarned;

    await user.save();

    res.status(200).json({
      success: true,
      isCorrect,
      pointsEarned,
      totalPoints: user.points,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { solveChallenge };
