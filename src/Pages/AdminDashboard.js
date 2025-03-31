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

    const today = new Date().toLocaleDateString();

    const todaysTransactions = storedTransactions.filter(transaction => transaction.date === today);

    let totalAmount = todaysTransactions.reduce((sum, transaction) => {
      const amount = parseFloat(transaction.amount);
      return !isNaN(amount) ? sum + amount : sum;
    }, 0);

    setTotalEarnings(totalAmount.toFixed(2));
    setPendingServices(todaysTransactions.length);
    setActiveUsers(new Set(todaysTransactions.map(transaction => transaction.userName)).size);
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-title">⚙️ Admin Dashboard</h1>

      {/* Admin Statistics Section */}
      <div className="admin-stats">
        <div className="stat-card">💰 Total Earnings Today: ₹{totalEarnings}</div>
        <div className="stat-card">⏳ Services Booked Today: {pendingServices}</div>
        <div className="stat-card">👥 Active Users Today: {activeUsers}</div>
      </div>

      {/* Admin Actions Section */}
      <div className="admin-actions">
        <button onClick={() => navigate("/manage-system-allotment")}>📌 Manage System Allotments</button>
        <button onClick={() => navigate("/manage-laptop-services")}>🛠 Manage Laptop Services</button>
        <button onClick={() => navigate("/manage-cctv-services")}>📹 Manage CCTV Services</button>
        <button onClick={() => navigate("/manage-ticket-booking")}>🎟 Manage Ticket Bookings</button>
        <button onClick={() => navigate("/admin/manage-other-services")}>📑 Manage Other Services</button> {/* ✅ New Button */}
        <button onClick={() => navigate("/admin/manage-transactions")}>📜 View Transaction History</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
