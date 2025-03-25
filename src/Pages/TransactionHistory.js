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
              <th>User ID</th> {/* Added User ID for tracking unique users */}
              <th>Service Type</th>
              <th>Details</th>
              <th>Status</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.userID}</td> {/* Displaying User ID */}
                <td>{transaction.serviceType}</td>
                <td>{transaction.details}</td>
                <td>{transaction.status}</td> {/* Added Status for Pending Calculation */}
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
