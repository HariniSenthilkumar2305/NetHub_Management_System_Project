import React, { useState, useEffect } from "react";
import "./TransactionHistory.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  return (
    <div className="transaction-container">
      <h2>📜 Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User Name</th>
              <th>Service Type</th>
              <th>Details</th>
              <th>Amount (₹)</th>
              <th>Admin Status</th> {/* New Column for Status */}
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
                  {transaction.status || "Pending"} {/* Dynamically Display Status */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
