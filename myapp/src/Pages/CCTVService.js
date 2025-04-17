import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./CCTVService.css";
import cctvIllustration from "../Pages/CCTVServiceimg.jpg"; // Import an illustration

const CCTVService = () => {
  const [serviceType, setServiceType] = useState("Installation");
  const [numCameras, setNumCameras] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [adminStatus, setAdminStatus] = useState("Pending");

  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    const basePrice = serviceType === "Installation" ? 500 : 300;
    const totalCost = basePrice + numCameras * 100;
    setEstimatedCost(totalCost);
    setStatus("Pending");

    // Store request in localStorage
    const newRequest = {
      serviceType,
      numCameras,
      address,
      date,
      status: "Pending",
      estimatedCost: totalCost,
    };

    const existingRequests = JSON.parse(localStorage.getItem("cctvServiceRequests")) || [];
    existingRequests.push(newRequest);
    localStorage.setItem("cctvServiceRequests", JSON.stringify(existingRequests));
  };


  // Redirect to Payment Page with details
  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        serviceName: "CCTV Service",
        serviceType,
        numCameras,
        address,
        date,
        totalAmount: estimatedCost,
      },
    });
  };

  return (
    <div className="cctv-page">
      <div className="cctv-service-container">
        {/* Left Side - Text & Image */}
        <div className="service-info">
          <h1>Protect Your Home with CCTV</h1>
          <p>Get high-quality installation and repair services for your security cameras.</p>
          <img src={cctvIllustration} alt="CCTV Illustration" className="cctv-image" />
        </div>

        {/* Middle - Form */}
        <div className="form-box">
          <h2>Request CCTV Service</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Service Type:</label>
              <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                <option value="Installation">Installation</option>
                <option value="Repair">Repair</option>
              </select>
            </div>

            <div className="input-group">
              <label>Number of Cameras:</label>
              <input
                type="number"
                value={numCameras}
                onChange={(e) => setNumCameras(e.target.value)}
                required
                min="1"
              />
            </div>

            <div className="input-group">
              <label>Location Address:</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <div className="input-group">
              <label>Preferred Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            <button type="submit" className="submit-btn">Submit Request</button>
          </form>

          {estimatedCost && (
            <div className="result-box">
              <h3>Estimated Cost: ₹{estimatedCost}</h3>
              <h3>Status: {status}</h3>
              <button className="pay-btn" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          )}
        </div>

        {/* Right Side - Admin Panel */}
        <div className="admin-panel">
          <h3>Admin Status Update</h3>
          <select value={adminStatus} onChange={(e) => setAdminStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <p className={`status ${adminStatus.toLowerCase()}`}>Status: {adminStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default CCTVService;
