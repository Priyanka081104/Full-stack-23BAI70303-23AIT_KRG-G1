const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.transferMoney = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || !amount) {
      return res.status(400).json({ message: 'from, to, and amount are required' });
    }

    // start transaction
    session.startTransaction();

    const sender = await User.findById(from).session(session);
    const receiver = await User.findById(to).session(session);

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    if (amount <= 0) {
      throw new Error('Transfer amount must be greater than 0');
    }

    if (sender.balance < amount) {
      // create a failed transaction record outside of the transaction so it's persisted
      await Transaction.create({ from, to, amount, status: 'FAILED', reason: 'Insufficient balance' });
      throw new Error('Insufficient balance');
    }

    // modify balances
    sender.balance -= amount;
    receiver.balance += amount;

    // save with session
    await sender.save({ session });
    await receiver.save({ session });

    // record transaction inside session
    await Transaction.create([
      { from, to, amount, status: 'SUCCESS' }
    ], { session });

    await session.commitTransaction();

    res.json({ message: 'Transfer successful' });
  } catch (err) {
    try {
      await session.abortTransaction();
    } catch (abortErr) {
      console.error('Failed to abort transaction', abortErr);
    }
    next(err);
  } finally {
    session.endSession();
  }
};

exports.listTransactions = async (req, res, next) => {
  try {
    const txs = await Transaction.find().populate('from to', 'name email').sort({ createdAt: -1 }).lean();
    res.json(txs);
  } catch (err) {
    next(err);
  }
};
