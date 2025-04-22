const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addExpense, getExpenses } = require("../controllers/expenseController");

router.post("/", auth, addExpense);
router.get("/", auth, getExpenses);

module.exports = router;