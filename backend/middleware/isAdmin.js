const User = require("../model/userSchema");

const isAdmin = async (req, res, next) => {
  try {
    // req.user must be set by authMiddleware (protect)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No user found in request."
      });
    }

    // Fetch user from DB
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Role check (admin only)
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied! Admins only."
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in isAdmin middleware",
      error: error.message,
    });
  }
};

module.exports = isAdmin;
