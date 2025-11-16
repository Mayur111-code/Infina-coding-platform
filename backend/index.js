// // const dotenv = require('dotenv'); 

// // const express = require('express');

// // const connection = require('./config/db')
// // const userSchema = require ('./model/userSchema');
// // const userRoutes = require('./routes/userRoutes');
// // const challengeRoutes = require("./routes/challengeRoutes");
// // //const authRoutes = require('./routes/authRoute')


// // dotenv.config();


// // connection()



// // const app = express();
// // app.use(express.json());
// // //app.use('/api/users', require('./routes/userRoutes'));


// // app.use('/api/users', userRoutes);
// // //app.use('/api/auth', authRoutes);
// // app.use("/api/challenges", challengeRoutes);


// // const port = process.env.PORT;
// // const host = process.env.HOST;


// // app.get('/', (req, res) => {
// //   res.send('✅ Server is running successfully!');
// // });


// // app.listen(port, host, () => {
// //   console.log(`🚀 Server running at http://${host}:${port}`);
// // });


// const dotenv = require('dotenv'); 
// const express = require('express');
// const cors = require('cors'); // ✅ add this
// const connection = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const challengeRoutes = require("./routes/challengeRoutes");
// const solveRoutes = require('./routes/solveRoutes');
// const leaderboardRoutes = require("./routes/leaderboardRoutes");
// const rewardRoutes = require("./routes/rewardRoutes")
// // const authRoutes = require('./routes/authRoute');

// dotenv.config();

// // ✅ Initialize app first
// const app = express();

// // ✅ Enable CORS (allow frontend requests)
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// // ✅ Middleware
// app.use(express.json());

// // ✅ Connect MongoDB
// connection();

// // ✅ Routes
// app.use('/api/users', userRoutes);
// // app.use('/api/auth', authRoutes);
// app.use('/api/challenges', challengeRoutes);
// app.use("/api/solve", solveRoutes)

// app.use("/api/leaderboard", leaderboardRoutes);
// app.use("/api/rewards", rewardRoutes);


// // ✅ Root route
// app.get('/', (req, res) => {
//   res.send('✅ Server is running successfully!');
// });

// // ✅ Start server
// const port = process.env.PORT || 3000;
// const host = process.env.HOST || '127.0.0.1';

// app.listen(port, host, () => {
//   console.log(`🚀 Server running at http://${host}:${port}`);
// });



//  vercel deployement  

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const challengeRoutes = require("./routes/challengeRoutes");
const solveRoutes = require('./routes/solveRoutes');
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const rewardRoutes = require("./routes/rewardRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

connection();

app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);
app.use("/api/solve", solveRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/rewards", rewardRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Backend running on Vercel successfully!');
});

// 👉 MOST IMPORTANT
module.exports = app;
