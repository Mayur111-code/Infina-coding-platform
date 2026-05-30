const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); // your protect middleware
const { createReward, getRewards, updateReward, deleteReward } = require('../controllers/rewardController');

// public: list
router.get('/', getRewards);

// admin create
router.post('/', protect, createReward);

// admin update
router.put('/:id', protect, updateReward);

// admin delete
router.delete('/:id', protect, deleteReward);

module.exports = router;
