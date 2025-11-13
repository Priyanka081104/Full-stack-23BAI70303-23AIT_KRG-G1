const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', transactionRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
