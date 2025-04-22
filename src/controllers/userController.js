const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getWallet = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { wallet: true }
    });
    res.json({ wallet: user.wallet });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch wallet" });
  }
};
