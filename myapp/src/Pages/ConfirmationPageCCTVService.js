import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPageCCTVService.css";

const ConfirmationPageCCTVService = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    serviceName,
    serviceType,
    numCameras,
    address,
    date,
    totalAmount,
  } = location.state || {};

  const handleThankYou = () => {
    navigate("/dashboard");
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <h2>Payment Successful!</h2>
        <p>Thank you for booking <strong>{serviceName}</strong>.</p>
        <p><strong>Service Type:</strong> {serviceType}</p>
        <p><strong>Number of Cameras:</strong> {numCameras}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Date:</strong> {date}</p>
        <p className="total-amount"><strong>Amount Paid:</strong> ₹{totalAmount}</p>
        <button onClick={handleThankYou}>Thank You</button>
      </div>
    </div>
  );
};

export default ConfirmationPageCCTVService;
