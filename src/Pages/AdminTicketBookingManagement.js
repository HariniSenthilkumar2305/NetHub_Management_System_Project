import React, { useState, useEffect } from "react";
import "./AdminTicketBookingManagement.css";

const AdminTicketBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("ticketBookings")) || [];
    setBookings(storedBookings);

    // ✅ Calculate pending & confirmed counts
    const pending = storedBookings.filter((booking) => booking.status === "Pending").length;
    const confirmed = storedBookings.filter((booking) => booking.status === "Confirmed").length;

    setPendingCount(pending);
    setConfirmedCount(confirmed);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem("ticketBookings", JSON.stringify(updatedBookings));

    // ✅ Update counts dynamically
    const pending = updatedBookings.filter((booking) => booking.status === "Pending").length;
    const confirmed = updatedBookings.filter((booking) => booking.status === "Confirmed").length;

    setPendingCount(pending);
    setConfirmedCount(confirmed);
  };

  return (
    <div className="admin-ticket-management">
      <h1>🎫 Manage Ticket Bookings</h1>

      {/* ✅ Show Total Bookings */}
      <h2>Total Tickets Booked: {bookings.length}</h2>

      {/* ✅ Show Pending and Confirmed Counts */}
      <div className="status-summary">
        <p><strong>🔄 Pending:</strong> {pendingCount}</p>
        <p><strong>✅ Confirmed:</strong> {confirmedCount}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Transport Type</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Passengers</th>
            <th>Class</th>
            <th>Service</th>
            <th>Time</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.transportType}</td>
              <td>{booking.from}</td>
              <td>{booking.to}</td>
              <td>{booking.date}</td>
              <td>{booking.passengers}</td>
              <td>{booking.class}</td>
              <td>{booking.serviceName}</td>
              <td>{booking.time}</td>
              <td>₹{booking.price}</td>
              <td>
                <select value={booking.status} onChange={(e) => updateStatus(booking.id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTicketBookingManagement;
