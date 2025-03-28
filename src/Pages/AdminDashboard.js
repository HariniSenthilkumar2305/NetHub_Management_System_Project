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

    // Get today's date in the same format used in transactions
    const today = new Date().toLocaleDateString();

    // Filter transactions that match today's date
    const todaysTransactions = storedTransactions.filter(transaction => transaction.date === today);

    // ✅ Ensure earnings are summed correctly (No merging issues)
    let totalAmount = 0;
    todaysTransactions.forEach(transaction => {
      if (transaction.amount && !isNaN(transaction.amount)) {
        totalAmount += transaction.amount;  // Add amount correctly
      }
    });
    setTotalEarnings(totalAmount);

    // ✅ Count today's pending services (total transactions for today)
    setPendingServices(todaysTransactions.length);

    // ✅ Count unique active users for today
    const uniqueUsers = new Set(todaysTransactions.map(transaction => transaction.userName)).size;
    setActiveUsers(uniqueUsers);

  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1>⚙️ Admin Dashboard</h1>

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
        <button onClick={() => navigate("/transaction-history")}>📜 View Transaction History</button>
      </div>
    </div>
  );
};
export default AdminDashboard;
