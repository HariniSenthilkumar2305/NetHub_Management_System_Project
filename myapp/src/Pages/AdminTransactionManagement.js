import React, { useState, useEffect } from "react";
import "./AdminTransactionManagement.css";

const AdminTransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);

  // ✅ Load from localStorage
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);

    // ✅ Sync to MongoDB (only if not already synced)
    if (storedTransactions.length > 0) {
      fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storedTransactions), // <-- Fixed here: send raw array
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Transactions synced to DB ✅", data);
        })
        .catch((err) => {
          console.error("Error syncing to DB ❌", err);
        });    
    }
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index].status = newStatus;
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <div className="admin-transaction-container">
      <h2>⚙️ Manage Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions to manage.</p>
      ) : (
        <table className="admin-transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User Name</th>
              <th>Service Type</th>
              <th>Details</th>
              <th>Amount (₹)</th>
              <th>Admin Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.userName || "Unknown"}</td>
                <td>{transaction.serviceType}</td>
                <td>{transaction.details}</td>
                <td>{transaction.amount}</td>
                <td className={`status-${transaction.status?.toLowerCase() || "pending"}`}>
                  {transaction.status || "Pending"}
                </td>
                <td>
                  <button
                    className="status-btn complete"
                    onClick={() => handleStatusChange(index, "Completed")}
                  >
                    ✅ Mark as Completed
                  </button>
                  <button
                    className="status-btn pending"
                    onClick={() => handleStatusChange(index, "Pending")}
                  >
                    ⏳ Mark as Pending
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTransactionManagement;