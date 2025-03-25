import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingServices, setPendingServices] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Calculate Total Earnings
    const earnings = storedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalEarnings(earnings);

    // Count Pending Services
    const pending = storedTransactions.filter(transaction => transaction.status === "Pending").length;
    setPendingServices(pending);

    // Count Unique Active Users (Assuming transactions have a userID field)
    const uniqueUsers = new Set(storedTransactions.map(transaction => transaction.userID)).size;
    setActiveUsers(uniqueUsers);
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1>⚙️ Admin Dashboard</h1>

      {/* Admin Statistics Section */}
      <div className="admin-stats">
        <div className="stat-card">💰 Total Earnings: ₹{totalEarnings}</div>
        <div className="stat-card">⏳ Pending Services: {pendingServices}</div>
        <div className="stat-card">👥 Active Users: {activeUsers}</div>
      </div>

      {/* Admin Actions Section */}
      <div className="admin-actions">
        <button onClick={() => navigate("/manage-system-allotment")}>📌 Manage System Allotments</button>
        <button onClick={() => navigate("/manage-laptop-services")}>🛠 Manage Laptop Services</button>
        <button onClick={() => navigate("/manage-cctv-services")}>📹 Manage CCTV Services</button>
        <button onClick={() => navigate("/manage-ticket-booking")}>🎟 Manage Ticket Bookings</button>
        <button onClick={() => navigate("/transaction-history")}>📜 View Transaction History</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
