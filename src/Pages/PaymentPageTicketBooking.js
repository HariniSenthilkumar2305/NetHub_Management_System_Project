import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageTicketBooking.css";

const PaymentPageTicketBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract booking details from location state
  const { formData, transport } = location.state || {};

  // Handle Payment
  const handlePayment = () => {
    const loggedInUser = localStorage.getItem("user") || "Unknown"; // Get logged-in user

    // Create a new transaction
    const newTransaction = {
      date: new Date().toLocaleDateString(), // Store date
      userName: loggedInUser, // Store username
      serviceType: "Ticket Booking", // Store service type
      details: `${formData.transportType} - ${formData.fromLocation} to ${formData.toLocation} (${transport.serviceName})`, // Store details
      amount: transport.price || 0, // Store amount
    };

    // Fetch existing transactions from localStorage
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Update localStorage with the new transaction
    localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));

    alert(`Payment Successful for ${formData.transportType} Ticket (₹${transport.price})`);

    // Navigate back to ticket booking page with confirmation
    navigate("/ticket-booking", { state: { bookingConfirmed: true, formData, transport } });
  };

  return (
    <div className="payment-container">
      <h2>💳 Payment for {formData.transportType} Ticket</h2>
      <p><strong>From:</strong> {formData.fromLocation} → <strong>To:</strong> {formData.toLocation}</p>
      <p><strong>Service:</strong> {transport.serviceName} | <strong>Departure:</strong> {transport.time}</p>
      <p><strong>Price:</strong> ₹{transport.price}</p>
      <button className="pay-btn" onClick={handlePayment}>✅ Confirm & Pay</button>
    </div>
  );
};

export default PaymentPageTicketBooking;
  