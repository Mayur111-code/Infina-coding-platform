// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // attach user object (without password)
      req.user = await User.findById(decoded.id).select("-userpass");

      if (!req.user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      return next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  }

  // if no token found
  return res.status(401).json({ success: false, message: "No token provided" });
};

module.exports = protect;
