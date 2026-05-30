// const express = require('express');

// const { registerUser, signinUser, updateUserProfile } = require('../controllers/userController');
// const protect = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware');

// const router = express.Router();

// // register route
// router.post('/register', registerUser);

// //signin route
// router.post('/signin', signinUser);

// //update user profile route

// router.put('/update/:id', protect, upload.single('userprofile'), updateUserProfile);

// router.get('/dashboard', protect, (req,res)=>{
//     res.json({
//         success:true,
//         message:`Welcome to your dashboard, user with email: ${req.user.email}`
//     });
// });

// module.exports = router;



const express = require('express');
const { registerUser, signinUser, updateUserProfile } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// ✅ Register route (add upload middleware here)
router.post('/register', upload.single('userprofile'), registerUser);

// ✅ Signin route
router.post('/signin', signinUser);

// ✅ Update user profile route
router.put('/update/:id', protect, upload.single('userprofile'), updateUserProfile);



const { getDashboardData } = require("../controllers/userController");
router.get("/dashboard", protect, getDashboardData);

// ✅ Protected Dashboard route
// router.get('/dashboard', protect, (req, res) => {
//   res.json({
//     success: true,
//     message: `Welcome to your dashboard, user with email: ${req.user.email}`,
//   });
// });

module.exports = router;
