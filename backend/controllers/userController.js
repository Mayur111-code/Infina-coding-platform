const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { username, useremail, userpass, userbirthdate } = req.body;

    // 🧩 1️⃣ Validate all fields
    if (!username || !useremail || !userpass || !userbirthdate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // 🧩 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ useremail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered!",
      });
    }

    // 🧩 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(userpass, 10);

    // 🧩 4️⃣ Create new user (include uploaded image from multer/cloudinary)
    const newUser = await User.create({
      username,
      useremail,
      userpass: hashedPassword,
      userbirthdate,
      userprofile: req.file ? req.file.path : "https://res.cloudinary.com/dkmaaoqqx/image/upload/bitemoji_mvxdoc.png", // ✅ Image URL from Cloudinary if uploaded
    });

    // 🧩 5️⃣ Respond with success
    res.status(201).json({
      success: true,
      message: "✅ User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        useremail: newUser.useremail,
        userbirthdate: newUser.userbirthdate,
        userprofile: newUser.userprofile,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//  LOGIN USER
const signinUser = async (req, res) => {
  try {
    const { useremail, userpass } = req.body;

    // 🧩 1️⃣ Validate
    if (!useremail || !userpass) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // 🧩 2️⃣ Find user
    const user = await User.findOne({ useremail });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // 🧩 3️⃣ Compare password
    const isMatch = await bcrypt.compare(userpass, user.userpass);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // 🧩 4️⃣ Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // 🧩 5️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        useremail: user.useremail,
        userprofile: user.userprofile,
        userbirthdate: user.userbirthdate,
        role:user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields conditionally
    if (req.body.username) user.username = req.body.username;
    if (req.body.useremail) user.useremail = req.body.useremail;
    if (req.body.userbirthdate) user.userbirthdate = req.body.userbirthdate;

    // If password provided → hash and update
    if (req.body.userpass && req.body.userpass.trim() !== "") {
      const hashedPassword = await bcrypt.hash(req.body.userpass, 10);
      user.userpass = hashedPassword;
    }

    // Update profile image (if new one uploaded via multer/cloudinary)
    if (req.file && req.file.path) {
      user.userprofile = req.file.path;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//USER DASHBOARD

// const getDashboardData = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({
//       success: true,
//       user: {
//         id: user._id,
//         username: user.username,
//         useremail: user.useremail,
//         userprofile: user.userprofile,
//         totalPoints: user.totalPoints || 0,
//         solvedChallenges: user.solvedChallenges || [],
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };




const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        useremail: user.useremail,
        userprofile: user.userprofile,

        // VERY IMPORTANT FIX:
        points: user.points,  

        solvedChallenges: user.solvedChallenges || [],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};





module.exports = { registerUser, signinUser, updateUserProfile, getDashboardData  };
