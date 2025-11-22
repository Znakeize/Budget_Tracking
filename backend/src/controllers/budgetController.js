const Budget = require('../models/Budget');

// @desc    Get all budgets
// @route   GET /api/budgets
// @access  Private
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add budget
// @route   POST /api/budgets
// @access  Private
exports.addBudget = async (req, res) => {
  try {
    const { name, amount, category, period } = req.body;

    const budget = new Budget({
      user: req.user.id,
      name,
      amount,
      category,
      period: period || 'monthly'
    });

    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get budget summary
// @route   GET /api/budgets/summary
// @access  Private
exports.getBudgetSummary = async (req, res) => {
  try {
    // This is a simplified example - in a real app, you'd calculate this based on transactions
    const summary = {
      income: 5000,
      expenses: 3500,
      balance: 1500,
      categories: {
        'Housing': 1200,
        'Food': 600,
        'Transportation': 400,
        'Entertainment': 200,
        'Utilities': 300,
        'Other': 300
      },
      recentTransactions: [
        {
          id: '1',
          description: 'Grocery Store',
          amount: 125.75,
          type: 'expense',
          category: 'Food',
          date: '2023-11-20T00:00:00.000Z'
        },
        {
          id: '2',
          description: 'Monthly Salary',
          amount: 2500.00,
          type: 'income',
          category: 'Salary',
          date: '2023-11-15T00:00:00.000Z'
        }
      ]
    };

    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};