require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bank?replicaSet=rs0';

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  await User.deleteMany({});

  const users = await User.create([
    { name: 'Alice', email: 'alice@example.com', balance: 1000 },
    { name: 'Bob', email: 'bob@example.com', balance: 500 }
  ]);

  console.log('Seeded users:', users.map(u => ({ id: u._id.toString(), name: u.name, balance: u.balance })));
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
