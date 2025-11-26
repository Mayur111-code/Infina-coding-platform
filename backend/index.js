// ------------------------------
//  📌 Imports
// ------------------------------
const dotenv = require('dotenv'); 
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const solveRoutes = require('./routes/solveRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

// ------------------------------
//  📌 Environment Config
// ------------------------------
dotenv.config();

// ------------------------------
//  📌 Initialize Express App
// ------------------------------
const app = express();

// ------------------------------
//  ✅ CORS Setup (Vercel + Local)
// ------------------------------
app.use(cors({
  origin: [
    "https://infina-coding-platform.vercel.app", // frontend URL
    "http://localhost:3000"
  ],
  credentials: true,
}));

// ------------------------------
//  📌 Middlewares
// ------------------------------
app.use(express.json());

// ------------------------------
//  📌 Database Connection
// ------------------------------
connection();

// ------------------------------
//  📌 API Routes
// ------------------------------
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/solve', solveRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/rewards', rewardRoutes);

// ------------------------------
//  📌 Test Route
// ------------------------------
app.get('/', (req, res) => {
  res.send('✅ Infina Coding Platform Backend is Running Successfully!');
});

// ------------------------------
//  📌 Start Server
// ------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
