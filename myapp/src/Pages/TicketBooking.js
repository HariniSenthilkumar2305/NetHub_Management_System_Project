import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TicketBooking.css";

const transportData = {
  Flight: [
    { id: 1, serviceName: "Air India", time: "10:00 AM", price: 5000 },
    { id: 2, serviceName: "IndiGo", time: "1:30 PM", price: 4500 },
    { id: 3, serviceName: "SpiceJet", time: "6:45 PM", price: 5200 },
  ],
  Bus: [
    { id: 4, serviceName: "RedBus", time: "9:00 AM", price: 800 },
    { id: 5, serviceName: "VRL Travels", time: "2:00 PM", price: 750 },
    { id: 6, serviceName: "KPN Travels", time: "8:30 PM", price: 900 },
  ],
  Train: [
    { id: 7, serviceName: "Rajdhani Express", time: "7:15 AM", price: 1200 },
    { id: 8, serviceName: "Shatabdi Express", time: "12:30 PM", price: 1100 },
    { id: 9, serviceName: "Duronto Express", time: "5:00 PM", price: 1150 },
  ],
};

const TicketBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingConfirmed = location.state?.bookingConfirmed || false; // Removed unused setBookingConfirmed
  const [selectedTransport, setSelectedTransport] = useState(location.state?.transport || null);
  const [formData, setFormData] = useState(location.state?.formData || {
    transportType: "",
    fromLocation: "",
    toLocation: "",
    travelDate: "",
    passengers: 1,
    preferredClass: "",
  });

  const [availableTransports, setAvailableTransports] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!formData.transportType || !formData.fromLocation || !formData.toLocation || !formData.travelDate || !formData.preferredClass) {
      alert("Please fill in all fields.");
      return;
    }
    setAvailableTransports(transportData[formData.transportType] || []);
  };

  const handleBooking = (transport) => {
    setSelectedTransport(transport);

    // Save booking details to local storage for Admin Management Page
    const bookingDetails = {
      id: Date.now(),
      transportType: formData.transportType,
      from: formData.fromLocation,
      to: formData.toLocation,
      date: formData.travelDate,
      passengers: formData.passengers,
      class: formData.preferredClass,
      serviceName: transport.serviceName,
      time: transport.time,
      price: transport.price,
      status: "Pending",
    };

    const storedBookings = JSON.parse(localStorage.getItem("ticketBookings")) || [];
    localStorage.setItem("ticketBookings", JSON.stringify([...storedBookings, bookingDetails]));

    navigate("/payment-ticket", { state: { formData, transport } });
  };

  const handleRedirectToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="ticket-booking-wrapper">
      <div className="ticket-booking-container">
        <h1 className="ticket-header">🌍 Travel with Ease - Book Your Ticket Now!</h1>

        {!bookingConfirmed ? (
          <>
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <label>Transport Type:</label>
                <select name="transportType" value={formData.transportType} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Flight">Flight</option>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                </select>
              </div>

              <div className="input-group">
                <label>From:</label>
                <input type="text" name="fromLocation" value={formData.fromLocation} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>To:</label>
                <input type="text" name="toLocation" value={formData.toLocation} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Travel Date:</label>
                <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Number of Passengers:</label>
                <input type="number" name="passengers" min="1" value={formData.passengers} onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Preferred Class:</label>
                <select name="preferredClass" value={formData.preferredClass} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>

              <button type="submit" className="search-btn">Search Available Tickets</button>
            </form>

            {availableTransports.length > 0 && (
              <div className="available-transports">
                <h3>🚌 Available {formData.transportType}s</h3>
                {availableTransports.map((transport) => (
                  <div key={transport.id} className="transport-option">
                    <p>
                      <strong>{transport.serviceName}</strong> - {transport.time} | ₹{transport.price}
                    </p>
                    <button className="book-now-btn" onClick={() => handleBooking(transport)}>Proceed to Payment</button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="confirmation-box">
            <h3>✅ Booking Confirmed!</h3>
            <p>Your ticket from <strong>{formData.fromLocation}</strong> to <strong>{formData.toLocation}</strong> has been booked successfully.</p>
            <p>🚍 {formData.transportType} - <strong>{selectedTransport?.serviceName}</strong> will depart from <strong>{formData.fromLocation}</strong> at <strong>{selectedTransport?.time}</strong>.</p>
            <button className="thank-you-btn" onClick={handleRedirectToDashboard}>Thank You for Booking</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketBooking;
