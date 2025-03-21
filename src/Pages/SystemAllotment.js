import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SystemAllotment.css";

const SystemAllotment = () => {
  const [systemType, setSystemType] = useState("PC");
  const [duration, setDuration] = useState(1);
  const [startTime, setStartTime] = useState("");
  const navigate = useNavigate();

  const pricePerHour = 50;
  const totalAmount = duration * pricePerHour;

  useEffect(() => {
    document.body.classList.add("system-allotment-bg");
    return () => {
      document.body.classList.remove("system-allotment-bg");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
