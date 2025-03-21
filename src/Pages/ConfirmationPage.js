import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { systemType, duration, startTime, totalAmount } = location.state || {};

  const handleGoToDashboard = () => {
    navigate("/dashboard"); // Redirecting to Dashboard Page
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <h2>🎉 Booking Confirmed! 🎉</h2>
        <p className="confirmation-message">
          Thank you for booking a <strong>{systemType}</strong> for  
          <strong> {duration} hour(s)</strong>, starting at <strong>{startTime}</strong>.
        </p>
        <p className="total-amount">Total Paid: <span>₹{totalAmount}</span></p>
        
        {/* "Enjoy Your Session" Button */}
        <button className="dashboard-btn" onClick={handleGoToDashboard}>
          Enjoy Your Session 😊
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
