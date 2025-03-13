import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageTicketBooking.css";

const PaymentPageTicketBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, transport } = location.state || {};

  if (!formData || !transport) {
    return <h2>No booking details found. Please go back and try again.</h2>;
  }

  const handlePayment = () => {
    setTimeout(() => {
      navigate("/ticket-booking", { state: { bookingConfirmed: true, formData, transport } });
    }, 1000);
  };

  return (
    <div className="payment-container">
      <h2>💳 Payment for {formData.transportType} Ticket</h2>
      <p><strong>From:</strong> {formData.fromLocation} → <strong>To:</strong> {formData.toLocation}</p>
      <p><strong>Service:</strong> {transport.serviceName} | <strong>Departure:</strong> {transport.time}</p>
      <p><strong>Price:</strong> ₹{transport.price}</p>
      <button className="pay-btn" onClick={handlePayment}>Confirm & Pay</button>
    </div>
  );
};

export default PaymentPageTicketBooking;
