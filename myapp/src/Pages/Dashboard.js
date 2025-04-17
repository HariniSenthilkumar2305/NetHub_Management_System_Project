import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout, isAdmin } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAdminVerification = () => {
    navigate("/admin-verification");
  };

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h2>NetHub</h2>
        <ul>
          <li onClick={() => navigate("/system-allotment")}>📌 System Allotment</li>
          <li onClick={() => navigate("/laptop-service")}>🛠 Laptop Service</li>
          <li onClick={() => navigate("/cctv-service")}>📹 CCTV Service</li>
          <li onClick={() => navigate("/ticket-booking")}>🎟 Ticket Booking</li>

          {/* New "Other Services" Button */}
          <li onClick={() => navigate("/other-services")}>🆕 Other Services</li>

          <li onClick={() => navigate("/transaction-history")}>💰 Transaction History</li>
          
          {isAdmin && <li onClick={() => navigate("/admin-dashboard")}>⚙️ Admin Panel</li>}
        </ul>

        <button className="admin-btn" onClick={handleAdminVerification}>Admin Verification</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1 className="animated-text">Welcome, {user || "User"}!</h1>
        <p>Manage your services with NetHub.</p>
      </main>
    </div>
  );
};

export default Dashboard;
