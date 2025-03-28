import React, { useState, useEffect } from "react";
import "./AdminCCTVServiceManagement.css";

const AdminCCTVServiceManagement = () => {
  const [cctvRequests, setCctvRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("cctvServiceRequests")) || [];
    setCctvRequests(storedRequests);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedRequests = [...cctvRequests];
    updatedRequests[index].status = newStatus;
    setCctvRequests(updatedRequests);
    localStorage.setItem("cctvServiceRequests", JSON.stringify(updatedRequests));
  };

  return (
    <div className="admin-cctv-container">
      <h1>📹 Admin - Manage CCTV Service Requests</h1>
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
