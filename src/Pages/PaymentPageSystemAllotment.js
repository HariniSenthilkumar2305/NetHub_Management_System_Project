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
    const loggedInUser = localStorage.getItem("user") || "Unknown"; // Get logged-in user

    // Create a new transaction
    const newTransaction = {
      date: new Date().toLocaleDateString(), // Store date
      userName: loggedInUser, // Store username
      serviceType: "System Allotment", // Store service type
      details: `${systemType} - ${duration} hours (Start Time: ${startTime})`, // Store details
      amount: totalAmount || 0, // Store amount
    };

    // Fetch existing transactions from localStorage
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Update localStorage with the new transaction
    localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));

    alert(`Payment Successful for ${serviceName} (₹${totalAmount})`);

    // Navigate to the confirmation page
    navigate("/confirmation", { state: { serviceName, systemType, duration, startTime, totalAmount } });
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
