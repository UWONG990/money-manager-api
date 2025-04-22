require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const transactionRoutes = require("./src/routes/transactions");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/user", require("./src/routes/user"));

// Optional root route
app.get("/", (req, res) => {
  res.send("Welcome to the Expense Manager API 🚀");
});

module.exports = app;
