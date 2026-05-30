// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   userprofile: {
//     type: String,
//     default: "https://res.cloudinary.com/dkmaaoqqx/image/upload/bitemoji_mvxdoc.png"
//   },

//   username: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   useremail: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },

//   userpass: {
//     type: String,
//     required: true,
//   },

//   userbirthdate: {
//     type: Date,
//     required: true,
//   },

//   // ✅ Email Verification
//   // isVerified: {
//   //   type: Boolean,
//   //   default: false
//   // },
//   // otp: {
//   //   type: String,
//   //   default: null
//   // },
//   // otpExpires: {
//   //   type: Date,
//   //   default: null
//   // },

//   // ✅ Points System (for dashboard + leaderboard)
//   solvedChallenges: [
//   {
//     challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
//     isCorrect: { type: Boolean, default: false },
//     pointsEarned: { type: Number, default: 0 }
//   }
// ],
// points: { type: Number, default: 0 },


//   // ✅ Role System (user/admin)
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user"
//   }

// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userprofile: String,
  username: String,
  useremail: String,
  userpass: String,
  userbirthdate: Date,

  // CORRECT WAY
  solvedChallenges: [
    {
      challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
      isCorrect: Boolean,
      pointsEarned: Number,
    }
  ],

  points: { type: Number, default: 0 },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);
