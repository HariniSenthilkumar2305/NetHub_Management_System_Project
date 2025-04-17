import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageTicketBooking.css";

const PaymentPageTicketBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract booking details from location state
  const { formData, transport } = location.state || {};

  // Handle Payment
 // ✅ Handle Payment
const handlePayment = () => {
  const loggedInUser = localStorage.getItem("user") || "Unknown"; // Get logged-in user

  // Create a new transaction
  const newTransaction = {
    date: new Date().toLocaleDateString(),
    userName: loggedInUser,
    serviceType: "Ticket Booking",
    details: `${formData.transportType} - ${formData.fromLocation} to ${formData.toLocation} (${transport.serviceName})`,
    amount: transport.price || 0,
    status: "Pending", // Optional: set initial status
  };

  // ✅ Save to localStorage (optional for frontend display)
  const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newTransaction]));

  // ✅ Also save to MongoDB via your backend API
  fetch("http://localhost:5000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTransaction),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Transaction saved to MongoDB:", data);
      alert(`Payment Successful for ${formData.transportType} Ticket (₹${transport.price})`);

      // Navigate after successful DB save
      navigate("/ticket-booking", { state: { bookingConfirmed: true, formData, transport } });
    })
    .catch((err) => {
      console.error("❌ Failed to save transaction to MongoDB:", err);
      alert("Payment saved locally, but failed to store in database.");
    });
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
  