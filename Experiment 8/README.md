# Bank Transactions with MongoDB Transactions and Rollback

This sample project demonstrates a simple banking transaction system using Node.js, Express, Mongoose and MongoDB transactions (sessions) to ensure atomic money transfers with rollback on failure.

Prerequisites
- Node.js (16+ recommended)
- MongoDB configured as a replica set (transactions require a replica set)

Quick setup
1. Clone or copy files into a folder.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` and `PORT`.
3. Ensure MongoDB runs as a replica set. For local testing, you can start `mongod` with a single-node replica set:

   # In PowerShell (example)
   mongod --dbpath C:\data\db --replSet rs0

   Then in another shell run:

   mongo --eval "rs.initiate()"

4. Install deps and start:

   npm install
   npm run seed    # creates sample users
   npm start

Routes
- POST /api/users       -> create user { name, email, balance }
- GET  /api/users       -> list users
- POST /api/transfer    -> transfer money { from: userId, to: userId, amount }
- GET  /api/transactions -> list transaction history

Notes
- All transfers use MongoDB transactions (sessions). On insufficient funds or failure, the transaction is aborted and no balance changes persist.
- This project is educational; for production, add authentication, input validation, rate-limiting, and monitoring.

Viva Questions (covered in README):
1. What is a transaction? A transaction is a unit of work that is atomic, consistent, isolated, and durable (ACID).
2. How does MongoDB ensure atomicity? Through multi-document transactions across replica sets that either commit all changes or none.
3. What happens if the system fails mid-transaction? If not committed, the transaction is aborted; partially-applied changes are rolled back.
4. What is the role of sessions in MongoDB? Sessions group operations in a transaction and track transactional state.
5. How to enable transactions in MongoDB? Use a replica set. Single-node replica set is fine for local testing: start `mongod` with `--replSet` and run `rs.initiate()` in the shell.
