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

  // ✅ Ensuring amounts are correctly parsed before summing
  let totalAmount = todaysTransactions.reduce((sum, transaction) => {
    const amount = parseFloat(transaction.amount); // Ensure it's a number
    return !isNaN(amount) ? sum + amount : sum; // Add only if valid number
  }, 0);

  setTotalEarnings(totalAmount.toFixed(2)); // Display up to 2 decimal places

    // ✅ Count today's pending services (total transactions for today)
    setPendingServices(todaysTransactions.length);

    // ✅ Count unique active users for today
    const uniqueUsers = new Set(todaysTransactions.map(transaction => transaction.userName)).size;
    setActiveUsers(uniqueUsers);

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
        <button onClick={() => navigate("/admin/manage-transactions")}>📜 View Transaction History</button>
      </div>
    </div>
  );
};
export default AdminDashboard;
