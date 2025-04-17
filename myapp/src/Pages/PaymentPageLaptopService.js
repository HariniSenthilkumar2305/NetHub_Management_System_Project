import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageLaptopService.css";

const PaymentPageLaptopService = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract service details from location state
  const { serviceName, brand, model, issueType, description, totalAmount } = location.state || {};

  // Handle Payment
  const handlePayment = () => {
    const loggedInUser = localStorage.getItem("user") || "Unknown";
  
    const newTransaction = {
      date: new Date().toLocaleDateString(),
      userName: loggedInUser,
      serviceType: "Laptop Service",
      details: `${brand} ${model} - ${issueType}`,
      amount: totalAmount || 0,
      status: "Pending", // Optional, but good for Admin status
    };
  
    // ✅ 1. Save in localStorage (for frontend display)
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));
  
    // ✅ 2. Send to backend MongoDB API
    fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Transaction saved to MongoDB:", data);
        alert(`Payment Successful for ${serviceName} (₹${totalAmount})`);
  
        // ✅ Navigate to confirmation page
        navigate("/confirmation-laptop-service", {
          state: { serviceName, brand, model, issueType, description, totalAmount },
        });
      })
      .catch((err) => {
        console.error("❌ Failed to save transaction to MongoDB:", err);
        alert("❌ Payment successful locally, but failed to sync with server.");
      });
  };
  

  return (
    <div className="laptop-payment-container">
      <div className="laptop-payment-box">
        <h2>💳 Payment for Laptop Service</h2>
        <div className="payment-details">
          <p><strong>Service:</strong> {serviceName}</p>
          <p><strong>Laptop:</strong> {brand} {model}</p>
          <p><strong>Issue Type:</strong> {issueType}</p>
          <p><strong>Description:</strong> {description}</p>
          <p className="total-amount"><strong>Total Amount:</strong> ₹{totalAmount}</p>
        </div>
        <button className="pay-now-btn" onClick={handlePayment}>✅ Pay Now</button>
      </div>
    </div>
  );
};

export default PaymentPageLaptopService;