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
    const loggedInUser = localStorage.getItem("user") || "Unknown"; // Get logged-in username

    // Create a new transaction
    const newTransaction = {
      date: new Date().toLocaleDateString(), // Store date
      userName: loggedInUser, // Store username
      serviceType: "Laptop Service", // Store service type
      details: `${brand} ${model} - ${issueType}`, // Store details
      amount: totalAmount || 0, // Store amount
    };

    // Fetch existing transactions from localStorage
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Update localStorage with the new transaction
    localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));

    alert(`Payment Successful for ${serviceName} (₹${totalAmount})`);

    // Navigate to the confirmation page
    navigate("/confirmation-laptop-service", { state: { serviceName, brand, model, issueType, description, totalAmount } });
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
