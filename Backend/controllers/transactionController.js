const Transaction = require("../models/Transaction.js"); // adjust the path if needed

// POST /api/transactions/bulk
const saveTransactions = async (req, res) => {
  try {
    const transactions = req.body; // ✅ Expecting raw array
    if (!Array.isArray(transactions)) {
      return res.status(400).json({ message: "Expected an array of transactions" });
    }

    await Transaction.insertMany(transactions);
    res.json({ message: "Transactions saved successfully" });
  } catch (error) {
    console.error("Error saving transactions:", error);
    res.status(500).json({ message: "Failed to save transactions" });
  }
};

// Optional GET controller
const getTransactions = async (req, res) => {
  try {
    const all = await Transaction.find().sort({ date: -1 });
    res.json(all);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

module.exports = { saveTransactions, getTransactions };
