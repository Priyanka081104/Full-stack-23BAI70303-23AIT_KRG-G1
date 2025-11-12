const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

router.get("/balance", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ balance: user.balance });
});

router.post("/transfer", auth, async (req, res) => {
  const { toEmail, amount } = req.body;
  // perform debit/credit logic here (ensure proper validation!)
  res.json({ message: "Transfer complete" });
});

module.exports = router;
