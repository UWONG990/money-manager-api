const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addIncome,
  addExpense,
  getTransactions
} = require("../controllers/transactionController");

router.post("/income", auth, addIncome);
router.post("/expense", auth, addExpense);
router.get("/", auth, getTransactions);

module.exports = router;
