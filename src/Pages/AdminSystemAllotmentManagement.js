import React, { useState, useEffect } from "react";
import "./AdminSystemAllotmentManagement.css";

const AdminSystemAllotmentManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch stored system allotments (mocking fetching from localStorage)
    const storedBookings = JSON.parse(localStorage.getItem("systemAllotments")) || [];
    setBookings(storedBookings);
  }, []);

  // ✅ Mark session as completed
  const handleComplete = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = "Completed";
    setBookings(updatedBookings);
    localStorage.setItem("systemAllotments", JSON.stringify(updatedBookings));
  };

  // ✅ Extend or Reduce Usage Time
  const handleTimeChange = (index, newDuration) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].duration = newDuration;
    updatedBookings[index].totalAmount = newDuration * 50; // Update total price dynamically
    setBookings(updatedBookings);
    localStorage.setItem("systemAllotments", JSON.stringify(updatedBookings));
  };

  return (
    <div className="admin-system-allotment-container">
      <h1>🖥 System Allotment Management</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings">No active bookings available.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <div key={index} className={`booking-card ${booking.status === "Completed" ? "completed" : ""}`}>
              <h3>{booking.systemType} Booking</h3>
              <p><strong>Duration:</strong> {booking.duration} hour(s)</p>
              <p><strong>Start Time:</strong> {booking.startTime}</p>
              <p><strong>Total Cost:</strong> ₹{booking.totalAmount}</p>
              <p><strong>Status:</strong> <span className={booking.status === "Completed" ? "completed-text" : "pending-text"}>{booking.status || "Pending"}</span></p>

              {booking.status !== "Completed" && (
                <div className="actions">
                  <label>Modify Time:</label>
                  <select onChange={(e) => handleTimeChange(index, parseInt(e.target.value))} value={booking.duration}>
                    {[1, 2, 3, 4, 5].map((hour) => (
                      <option key={hour} value={hour}>{hour} hour(s)</option>
                    ))}
                  </select>
                  <button className="complete-btn" onClick={() => handleComplete(index)}>✅ Mark Completed</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSystemAllotmentManagement;
