import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <h1>⚙️ Admin Dashboard</h1>
      <div className="admin-stats">
        <div className="stat-card">💰 Total Earnings: ₹50,000</div>
        <div className="stat-card">⏳ Pending Services: 12</div>
        <div className="stat-card">👥 Active Users: 150</div>
      </div>

      <div className="admin-actions">
        <button onClick={() => navigate("/manage-system-allotment")}>📌 Manage System Allotments</button>
        <button onClick={() => navigate("/manage-laptop-services")}>🛠 Manage Laptop Services</button>
        <button onClick={() => navigate("/manage-cctv-services")}>📹 Manage CCTV Services</button>
        <button onClick={() => navigate("/manage-ticket-booking")}>🎟 Manage Ticket Bookings</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
