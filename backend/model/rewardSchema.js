// const mongoose = require("mongoose");

// const rewardSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     pointsRequired: { type: Number, required: true },

//     price: { type: Number, required: true },
//     originalPrice: { type: Number, required: true },

//     validity: { type: String, required: true },

//     rating: { type: Number, default: 4.5 },
//     category: { type: String, default: "General" },

//     image: { type: String, required: true },

//     isPopular: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Reward", rewardSchema);



const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  pointsRequired: { type: Number, required: true, default: 0 }, // points needed to redeem
  price: { type: Number, default: 0 }, // optional currency price
  imageUrl: { type: String, default: '' },
  validity: { type: String, default: '' }, // e.g. "1 Month"
  category: { type: String, default: 'General' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  stock: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Reward', rewardSchema);
