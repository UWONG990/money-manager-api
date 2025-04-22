const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addExpense = async (req, res) => {
  const { amount, category, note } = req.body;
  const userId = req.user.id;

  try {
    const expense = await prisma.expense.create({
      data: { amount, category, note, userId }
    });

    // Decrease wallet
    await prisma.user.update({
      where: { id: userId },
      data: {
        wallet: { decrement: amount } // subtract from wallet
      }
    });

    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Could not add expense" });
  }
};


exports.getTransactions = async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch transactions" });
  }
};


exports.addIncome = async (req, res) => {
  const { amount, category, note } = req.body;
  const userId = req.user.id;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        category,
        note,
        type: "income",
        userId,
      },
    });

    // Update wallet
    await prisma.user.update({
      where: { id: userId },
      data: { wallet: { increment: amount } },
    });

    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not add income" });
  }
};
