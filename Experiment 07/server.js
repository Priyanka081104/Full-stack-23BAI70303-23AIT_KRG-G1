require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// mount routes
const authRoutes = require("./Routes/auth");
const bankRoutes = require("./Routes/bank");
app.use("/api/auth", authRoutes);
app.use("/api/bank", bankRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => console.log("Server running on 3000"));
