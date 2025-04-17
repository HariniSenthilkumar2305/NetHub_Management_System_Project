import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageSystemAllotment.css";

const PaymentPageSystemAllotment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract service details from location state
  const { serviceName, systemType, duration, startTime, totalAmount } = location.state || {};

  // Handle Payment
  const handlePayment = () => {
    const loggedInUser = localStorage.getItem("user") || "Unknown";
  
    const newTransaction = {
      date: new Date().toLocaleDateString(),
      userName: loggedInUser,
      serviceType: "System Allotment",
      details: `${systemType} - ${duration} hours (Start Time: ${startTime})`,
      amount: totalAmount || 0,
      status: "Pending", // Add status field
    };
  
    // ✅ Save to localStorage
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));
  
    // ✅ Save to MongoDB via API
    fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Saved to MongoDB:", data);
      })
      .catch((err) => {
        console.error("❌ Failed to save to MongoDB:", err);
      });
  
    alert(`Payment Successful for ${serviceName} (₹${totalAmount})`);
  
    navigate("/confirmation", {
      state: { serviceName, systemType, duration, startTime, totalAmount },
    });
  };
  

  return (
    <div className="system-payment-container">
      <div className="system-payment-box">
        <h2>💳 Payment for {serviceName}</h2>
        <p className="booking-details">
          You have booked a <strong>{systemType}</strong> for <strong>{duration} hour(s)</strong>,  
          starting at <strong>{startTime}</strong>.
        </p>
        <p className="total-amount"><strong>Total Amount:</strong> ₹{totalAmount}</p>
        <button className="pay-now-btn" onClick={handlePayment}>✅ Confirm and Pay</button>
      </div>
    </div>
  );
};

export default PaymentPageSystemAllotment;