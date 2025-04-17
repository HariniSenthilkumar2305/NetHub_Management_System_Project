import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageCCTVService.css";

const PaymentPageCCTVService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract service details from location state
  const { serviceName, serviceType, numCameras, address, date, totalAmount } = location.state || {};

  // Handle Payment Confirmation
  const handleConfirmPayment = async () => {
    const loggedInUser = localStorage.getItem("user") || "Unknown"; // Get logged-in username

    // Create new transaction entry
    const newTransaction = {
      date: new Date().toLocaleDateString(), // Store date
      userName: loggedInUser, // Store username
      serviceType: serviceType || "CCTV Service", // Store service type
      details: `${serviceType} - ${numCameras} Cameras at ${address}`, // Store details
      amount: totalAmount || 0, // Store amount
      status: "Pending", // Initial status
    };

    // ✅ Save to localStorage (for frontend usage)
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));

    // ✅ Send transaction to MongoDB backend
    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) {
        throw new Error("Failed to save transaction to MongoDB");
      }

      const savedData = await res.json();
      console.log("✅ Saved to MongoDB:", savedData);
    } catch (err) {
      console.error("❌ MongoDB Save Error:", err);
    }

    alert(`Payment Successful for ${serviceName} (₹${totalAmount})`);

    // Navigate to confirmation page
    navigate("/cctv-confirmation", {
      state: { serviceName, serviceType, numCameras, address, date, totalAmount }
    });
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Payment for {serviceName}</h2>
        <p><strong>Service Type:</strong> {serviceType}</p>
        <p><strong>Number of Cameras:</strong> {numCameras}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Date:</strong> {date}</p>
        <p className="total-amount"><strong>Total Amount:</strong> ₹{totalAmount}</p>
        <button onClick={handleConfirmPayment}>Confirm and Pay</button>
      </div>
    </div>
  );
};

export default PaymentPageCCTVService;