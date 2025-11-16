
const dotenv = require('dotenv'); 
const express = require('express');
const cors = require('cors'); // ✅ add this
const connection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const challengeRoutes = require("./routes/challengeRoutes");
const solveRoutes = require('./routes/solveRoutes');
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const rewardRoutes = require("./routes/rewardRoutes")
// const authRoutes = require('./routes/authRoute');

dotenv.config();

// ✅ Initialize app first
const app = express();

// ✅ Enable CORS (allow frontend requests)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ Middleware
app.use(express.json());

// ✅ Connect MongoDB
connection();

// ✅ Routes
app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use("/api/solve", solveRoutes)

app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/rewards", rewardRoutes);


// ✅ Root route
app.get('/', (req, res) => {
  res.send('✅ Server is running successfully!');
});

// ✅ Start server
const port = process.env.PORT || 3000;
 

app.listen(port,"0.0.0.0", () => {
  console.log(`🚀 Server running at:${port}`);
});


