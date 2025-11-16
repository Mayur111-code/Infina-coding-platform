const mongoose = require("mongoose");

// ✅ Challenge Schema
const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Challenge title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Challenge description is required"],
      trim: true,
    },
    points: {
      type: Number,
      required: [true, "Challenge points are required"],
      default: 10,
    },
    options: {
      type: [String],
      required: [true, "Options are required"],
      validate: {
        validator: (val) => val.length >= 2,
        message: "At least 2 options are required",
      },
    },
    correct: {
      type: String,
      required: [true, "Correct answer is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ Export Model
module.exports = mongoose.model("Challenge", challengeSchema);
