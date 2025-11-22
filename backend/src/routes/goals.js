const express = require('express');
const router = express.Router();
const { getGoals, addGoal, updateGoalProgress } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getGoals)
  .post(protect, addGoal);

router.put('/:id', protect, updateGoalProgress);

module.exports = router;