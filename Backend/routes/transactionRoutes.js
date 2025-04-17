const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// ✅ Save single transaction
router.post("/", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Error saving transaction", details: err });
  }
});

// ✅ Save bulk transactions (from localStorage sync)
router.post("/bulk", async (req, res) => {
  try {
    const transactions = req.body;
    const inserted = await Transaction.insertMany(transactions);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: "Error saving bulk transactions", details: err });
  }
});

// GET all transactions from DB
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions", details: err });
  }
});
module.exports = router;
