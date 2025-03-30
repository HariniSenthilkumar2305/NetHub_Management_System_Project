import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLaptopServiceManagement.css";

const AdminLaptopServiceManagement = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const navigate = useNavigate();

  // Fetch stored laptop service requests from localStorage
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("laptopServiceRequests")) || [];
    setServiceRequests(storedRequests);

    // ✅ Calculate pending & completed counts
    const pending = storedRequests.filter((req) => req.status === "In Progress").length;
    const completed = storedRequests.filter((req) => req.status === "Completed").length;
    
    setPendingCount(pending);
    setCompletedCount(completed);
  }, []);

  // ✅ Update status of a service request
  const updateStatus = (index, newStatus) => {
    const updatedRequests = [...serviceRequests];
    updatedRequests[index].status = newStatus;
    setServiceRequests(updatedRequests);
    localStorage.setItem("laptopServiceRequests", JSON.stringify(updatedRequests));

    // ✅ Update counts dynamically
    if (newStatus === "In Progress") {
      setPendingCount(pendingCount + 1);
      setCompletedCount(completedCount > 0 ? completedCount - 1 : 0);
    } else if (newStatus === "Completed") {
      setCompletedCount(completedCount + 1);
      setPendingCount(pendingCount > 0 ? pendingCount - 1 : 0);
    }
  };

  // ✅ Update service cost manually
  const updateCost = (index, newCost) => {
    const updatedRequests = [...serviceRequests];
    updatedRequests[index].serviceCost = newCost;
    setServiceRequests(updatedRequests);
    localStorage.setItem("laptopServiceRequests", JSON.stringify(updatedRequests));
  };

  return (
    <div className="admin-laptop-service-container">
      <h1>🛠 Laptop Service Management</h1>
  
      {/* ✅ Show Total Bookings */}
      <h2>Total Laptop Services Booked: {serviceRequests.length}</h2>

      {/* ✅ Show Pending and Completed Counts */}
      <div className="status-summary">
        <p><strong>🔄 Pending (In Progress):</strong> {pendingCount}</p>
        <p><strong>✅ Completed:</strong> {completedCount}</p>
      </div>
  
      {serviceRequests.length === 0 ? (
        <p className="no-requests">No laptop service requests found.</p>
      ) : (
        <table className="service-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Brand & Model</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Service Cost</th>
              <th>Expected Completion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{request.brand} {request.model}</td>
                <td>{request.issueType}</td>
                <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
                <td>
                  ₹
                  <input 
                    type="number" 
                    value={request.serviceCost} 
                    onChange={(e) => updateCost(index, e.target.value)} 
                    className="cost-input"
                  />
                </td>
                <td>{request.expectedCompletion}</td>
                <td>
                  <button 
                    className="btn in-progress" 
                    onClick={() => updateStatus(index, "In Progress")}
                  >
                    🔄 In Progress
                  </button>
                  <button 
                    className="btn completed" 
                    onClick={() => updateStatus(index, "Completed")}
                  >
                    ✅ Mark as Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
  
      <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>⬅ Back to Dashboard</button>
    </div>
  );
};

export default AdminLaptopServiceManagement;
