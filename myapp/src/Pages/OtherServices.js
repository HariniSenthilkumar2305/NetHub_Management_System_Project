import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./OtherServices.css";

const OtherServices = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user); // Set username dynamically
    }
  }, [user]);

  const [serviceType, setServiceType] = useState("");
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status as "Pending"

  const handleSaveTransaction = () => {
    if (!serviceType || !details || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const transaction = {
      date: new Date().toLocaleDateString(),
      userName: username || "Unknown",
      serviceType: serviceType,
      details: details,
      amount: parseFloat(amount),
      status: status,
      category: "OtherServices",
    };

    // ✅ Save to localStorage
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    localStorage.setItem("transactions", JSON.stringify([...existingTransactions, transaction]));

    // ✅ Save to MongoDB via Backend API
    fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Saved to MongoDB:", data);
      })
      .catch((err) => {
        console.error("❌ Failed to save to MongoDB:", err);
      });

    alert("Transaction Saved Successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="other-services-container">
      <h1>🆕 Other Services</h1>
      <div className="form-container">
        <label>📅 Date:</label>
        <input type="text" value={new Date().toLocaleDateString()} disabled />

        <label>👤 User Name:</label>
        <input type="text" value={username || "Unknown"} disabled />

        <label>🛠 Service Type:</label>
        <input
          type="text"
          placeholder="Enter Service Type"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        />

        <label>📜 Details:</label>
        <textarea
          placeholder="Enter Service Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>

        <label>💰 Amount (₹):</label>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>✅ Admin Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button className="save-btn" onClick={handleSaveTransaction}>
          Proceed to Save
        </button>
      </div>
    </div>
  );
};

export default OtherServices;
