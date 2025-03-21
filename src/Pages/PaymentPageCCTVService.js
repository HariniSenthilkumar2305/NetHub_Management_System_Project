import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageCCTVService.css";

const PaymentPageCCTVService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, serviceType, numCameras, address, date, totalAmount } = location.state || {};

  const handleConfirmPayment = () => {
    const transaction = {
      serviceType: "CCTV Service",
      details: `${serviceType} - ${numCameras} Cameras`,
      amount: totalAmount,
      date: new Date().toLocaleString(),
    };

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    navigate("/cctv-confirmation", { state: { serviceName, serviceType, numCameras, address, date, totalAmount } });
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
