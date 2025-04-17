require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// ✅ Enable CORS to allow requests from frontend (localhost:3000)
app.use(cors({
  origin: "http://localhost:3000", // adjust as needed for production
  credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB connection failed", err);
});

// API Route
app.use("/api/transactions", transactionRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
