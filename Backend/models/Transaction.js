const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: String,
  userName: String,
  serviceType: String,
  details: String,
  amount: Number,
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Transaction", transactionSchema);
