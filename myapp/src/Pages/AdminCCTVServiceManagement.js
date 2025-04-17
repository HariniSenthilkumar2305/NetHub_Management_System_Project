import React, { useState, useEffect } from "react";
import "./AdminCCTVServiceManagement.css";

const AdminCCTVServiceManagement = () => {
  const [cctvRequests, setCctvRequests] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("cctvServiceRequests")) || [];
    setCctvRequests(storedRequests);

    // ✅ Calculate pending & completed counts
    const pending = storedRequests.filter((req) => req.status === "In Progress").length;
    const completed = storedRequests.filter((req) => req.status === "Completed").length;
    
    setPendingCount(pending);
    setCompletedCount(completed);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedRequests = [...cctvRequests];
    updatedRequests[index].status = newStatus;
    setCctvRequests(updatedRequests);
    localStorage.setItem("cctvServiceRequests", JSON.stringify(updatedRequests));

    // ✅ Update counts dynamically
    const pending = updatedRequests.filter((req) => req.status === "In Progress").length;
    const completed = updatedRequests.filter((req) => req.status === "Completed").length;

    setPendingCount(pending);
    setCompletedCount(completed);
  };

  return (
    <div className="admin-cctv-container">
      <h1>📹 Admin - Manage CCTV Service Requests</h1>

      {/* ✅ Show Total Bookings */}
      <h2>Total CCTV Services Booked: {cctvRequests.length}</h2>

      {/* ✅ Show Pending and Completed Counts */}
      <div className="status-summary">
        <p><strong>🔄 Pending (In Progress):</strong> {pendingCount}</p>
        <p><strong>✅ Completed:</strong> {completedCount}</p>
      </div>

      <div className="cctv-table">
        <table>
          <thead>
            <tr>
              <th>Service Type</th>
              <th>Number of Cameras</th>
              <th>Address</th>
              <th>Preferred Date</th>
              <th>Estimated Cost</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {cctvRequests.length > 0 ? (
              cctvRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.serviceType}</td>
                  <td>{request.numCameras}</td>
                  <td>{request.address}</td>
                  <td>{request.date}</td>
                  <td>₹{request.estimatedCost}</td>
                  <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
                  <td>
                    <select onChange={(e) => updateStatus(index, e.target.value)} value={request.status}>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No CCTV Service Requests Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCCTVServiceManagement;
