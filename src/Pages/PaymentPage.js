import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve service details from state
  const { service, cost,serviceName, serviceType, numCameras, address, date,brand, model, issueType, description, systemType, duration, startTime, totalAmount, details } = location.state || {service: "Unknown", cost: 0 };
  const handlePayment = () => {
    alert(`Payment Successful for ${serviceName} (₹${totalAmount})`);
      navigate("/Dashboard"); 
  
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
