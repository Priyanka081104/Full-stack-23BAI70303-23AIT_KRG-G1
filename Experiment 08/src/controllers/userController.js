const User = require('../models/User');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, balance } = req.body;
    const user = await User.create({ name, email, balance: balance || 0 });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
