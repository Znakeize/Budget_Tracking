const express = require('express');
const router = express.Router();
const { getBudgets, addBudget, getBudgetSummary } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getBudgets)
  .post(protect, addBudget);

router.get('/summary', protect, getBudgetSummary);

module.exports = router;