const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getWallet } = require("../controllers/userController");

router.get("/wallet", auth, getWallet);

module.exports = router;
