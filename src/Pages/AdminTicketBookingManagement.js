import React, { useState, useEffect } from "react";
import "./AdminTicketBookingManagement.css";

const AdminTicketBookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("ticketBookings")) || [];
    setBookings(storedBookings);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem("ticketBookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="admin-ticket-management">
      <h1>🎫 Manage Ticket Bookings</h1>
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
                  <option value="Completed">Completed</option>
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
