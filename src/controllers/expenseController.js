const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addExpense = async (req, res) => {
  const { amount, category, note } = req.body;
  const userId = req.user.id;
  try {
    const expense = await prisma.expense.create({
      data: { amount, category, note, userId }
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Could not add expense" });
  }
};

exports.getExpenses = async (req, res) => {
  const userId = req.user.id;
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch expenses" });
  }
};
