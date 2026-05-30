const User = require('../model/userSchema');
const transporter = require('../config/mailer');
const { generateOTP } = require('../utils/otp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // ✅ Add this line

// ✅ A) Register + Send OTP
const sendOtpOnRegister = async (req, res) => {
  try {
    const { username, useremail, userpass, userbirthdate } = req.body;

    const existingUser = await User.findOne({ useremail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(userpass, 10);

    const newUser = await User.create({
      username,
      useremail,
      userpass: hashedPassword,
      userbirthdate,
      isVerified: false
    });

    const otp = generateOTP(6);
    const otpExpireMinutes = Number(process.env.OTP_EXPIRE_MINUTES) || 5;
    newUser.otp = otp;
    newUser.otpExpires = new Date(Date.now() + otpExpireMinutes * 60 * 1000);
    await newUser.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: useremail,
      subject: 'Infina - Verify your email (OTP)',
      text: `Hi ${username},\n\nYour OTP for Infina account verification is: ${otp}\nIt will expire in ${otpExpireMinutes} minutes.\n\nThanks,\nInfina Team`
    });

    res.status(201).json({
      success: true,
      message: 'User registered. OTP sent to email. Verify your account.',
      userId: newUser._id
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ B) Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { useremail, otp } = req.body;
    if (!useremail || !otp)
      return res.status(400).json({ success: false, message: 'Email and OTP required' });

    const user = await User.findOne({ useremail });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ success: false, message: 'User already verified' });

    if (!user.otp || !user.otpExpires || new Date() > user.otpExpires)
      return res.status(400).json({ success: false, message: 'OTP expired or invalid' });

    if (user.otp !== otp)
      return res.status(400).json({ success: false, message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: 'Email verified successfully!' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ C) Login (Signin)
const signinUser = async (req, res) => {
  try {
    const { useremail, userpass } = req.body;
    const user = await User.findOne({ useremail });

    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    if (!user.isVerified)
      return res.status(403).json({ success: false, message: 'Please verify your email before signing in.' });

    const isMatch = await bcrypt.compare(userpass, user.userpass);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid password' });

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.useremail },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user._id,
        username: user.username,
        useremail: user.useremail,
      },
      token, // ✅ Return JWT token
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Export all controllers
module.exports = { 
  sendOtpOnRegister, 
  verifyOtp, 
  signinUser 
};
