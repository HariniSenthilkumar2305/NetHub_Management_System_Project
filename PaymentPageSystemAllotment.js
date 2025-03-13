import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageSystemAllotment.css";

const PaymentPageSystemAllotment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, systemType, duration, startTime, totalAmount } = location.state || {};

  const handlePayment = () => {
    navigate("/confirmation", {
      state: { serviceName, systemType, duration, startTime, totalAmount },
    });
  };

  return (
    <div className="system-payment-container">
      <div className="system-payment-box">
        <h2>Payment for {serviceName}</h2>
        <p className="booking-details">
          You have booked a <strong>{systemType}</strong> for <strong>{duration} hour(s)</strong>,  
          starting at <strong>{startTime}</strong>.
        </p>
        <p className="total-amount">Total Amount: <span>₹{totalAmount}</span></p>
        <button onClick={handlePayment}>Confirm and Pay</button>
      </div>
    </div>
  );
};

export default PaymentPageSystemAllotment;
