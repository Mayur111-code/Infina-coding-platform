const Reward = require('../model/rewardSchema');

// Create Reward (admin)
const createReward = async (req, res) => {
  try {
    const {
      title,
      description,
      pointsRequired,
      price,
      imageUrl,
      validity,
      category,
      stock
    } = req.body;

    if (!title || !pointsRequired) {
      return res.status(400).json({ success: false, message: 'title and pointsRequired required' });
    }

    const reward = await Reward.create({
      title,
      description,
      pointsRequired: Number(pointsRequired),
      price: Number(price) || 0,
      imageUrl: imageUrl || '',
      validity: validity || '',
      category: category || 'General',
      stock: Number(stock) || 1,
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json({ success: true, reward });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all rewards (public)
const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, rewards });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update reward (admin)
const updateReward = async (req, res) => {
  try {
    const updated = await Reward.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Reward not found' });
    res.status(200).json({ success: true, reward: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete reward (admin)
const deleteReward = async (req, res) => {
  try {
    const removed = await Reward.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: 'Reward not found' });
    res.status(200).json({ success: true, message: 'Reward deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createReward, getRewards, updateReward, deleteReward };
