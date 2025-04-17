import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve service details from state
  const {
    serviceName,
    serviceType,
    details,
    totalAmount,
    numCameras,
    address,
    date,
    brand,
    model,
    issueType,
    description,
    systemType,
    duration,
    startTime
  } = location.state || { serviceName: "Unknown", totalAmount: 0 };
  // Handle Payment Process
  const handlePayment = () => {
    const loggedInUser = localStorage.getItem("user") || "Unknown"; // Get logged-in user

    const newTransaction = {
      date: new Date().toLocaleDateString(),
      userName: loggedInUser, // Store the username
      serviceType: serviceType || "Unknown Service", // Get service type dynamically
      details: details || "No details provided", // Get details dynamically
      amount: totalAmount || 0, // Store total amount
    };

    // Retrieve existing transactions or set an empty array if none exist
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    
    // Store updated transactions list in localStorage
    localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));

    alert(`Payment Successful for ${serviceName} (₹${totalAmount})`);

    navigate("/Dashboard"); // Redirect to Dashboard
  };

  return (
    <div className="payment-container">
      <h2>Payment for {serviceName}</h2>
      <p><strong>Details:</strong> {details}</p>
      <p><strong>Amount to Pay:</strong> ₹{totalAmount}</p>
      
      <button className="pay-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
