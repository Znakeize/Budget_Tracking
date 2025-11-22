const Goal = require('../models/Goal');

// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ deadline: 1 });
    res.json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add goal
// @route   POST /api/goals
// @access  Private
exports.addGoal = async (req, res) => {
  try {
    const { name, target, current, deadline } = req.body;

    const goal = new Goal({
      user: req.user.id,
      name,
      target,
      current: current || 0,
      deadline,
      completed: false
    });

    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update goal progress
// @route   PUT /api/goals/:id
// @access  Private
exports.updateGoalProgress = async (req, res) => {
  try {
    const { current } = req.body;
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Check if user owns the goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    goal.current = current;
    goal.completed = current >= goal.target;

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};