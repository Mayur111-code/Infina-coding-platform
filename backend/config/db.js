// // const mongoose = require('mongoose');

// // const connection = mongoose.connect(process.env.MONGO_URI)
// // .then(()=>{
// //     console.log("Db is connected");
// // }).catch((error)=>{
// //     console.log("db is not connected", error);
// // })

// // module.exports = connection;


// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed:", error.message);
//     process.exit(1); // Stop app if DB fails
//   }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no extra options needed
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectDB;
