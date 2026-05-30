const otpGenerator = require('otp-generator');

const generateOTP = (length = 6) => {
  // numeric OTP example: 6 digits
  return otpGenerator.generate(length, { digits: true, alphabets: false, upperCase: false, specialChars: false });
};

module.exports = { generateOTP };
