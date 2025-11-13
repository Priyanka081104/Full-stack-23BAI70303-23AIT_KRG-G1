const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/transfer', transactionController.transferMoney);
router.get('/transactions', transactionController.listTransactions);

module.exports = router;
