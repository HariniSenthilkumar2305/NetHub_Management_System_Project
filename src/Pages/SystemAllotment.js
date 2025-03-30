import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SystemAllotment.css";

const SystemAllotment = () => {
  const [systemType, setSystemType] = useState("PC");
  const [duration, setDuration] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
  const navigate = useNavigate();

  const pricePerHour = 50;
  const totalAmount = duration * pricePerHour;

  useEffect(() => {
    document.body.classList.add("system-allotment-bg");
    return () => {
      document.body.classList.remove("system-allotment-bg");
    };
  }, []);

  const checkAvailability = (newBooking) => {
    const existingBookings = JSON.parse(localStorage.getItem("systemAllotments")) || [];

    return existingBookings.some((booking) => {
      return (
        booking.systemType === newBooking.systemType &&  // Same system type
        booking.startTime === newBooking.startTime &&    // Same start time
        new Date(booking.id).toDateString() === new Date().toDateString() // Same day
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      id: Date.now(), // Unique ID for each booking
      systemType,
      duration,
      startTime,
      totalAmount,
      status: "Pending",
    };

    if (checkAvailability(newBooking)) {
      setErrorMessage("⚠️ This system is already booked for the selected time. Please choose a different time.");
      return;
    }

    // Clear error if no conflict
    setErrorMessage("");

    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem("systemAllotments")) || [];
    
    // Add new booking
    existingBookings.push(newBooking);
    localStorage.setItem("systemAllotments", JSON.stringify(existingBookings));

    // Navigate to Payment Page
    navigate("/payment-system-allotment", {
      state: {
        serviceName: "System Allotment",
        systemType,
        duration,
        startTime,
        totalAmount,
        details: `${systemType} for ${duration} hour(s), Start Time: ${startTime}`,
      },
    });
  };

  return (
    <div className="allotment-container">
      <h2>Book a System</h2>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>System Type:</label>
        <select value={systemType} onChange={(e) => setSystemType(e.target.value)}>
          <option value="PC">PC</option>
          <option value="Laptop">Laptop</option>
        </select>

        <label>Usage Duration (Hours):</label>
        <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}>
          {[1, 2, 3, 4].map((hour) => (
            <option key={hour} value={hour}>{hour} hour</option>
          ))}
        </select>

        <label>Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

        <div className="total-cost-wrapper">
          <p className="total-cost"><strong>Total Cost:</strong> ₹{totalAmount}</p>
        </div>

        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default SystemAllotment;
