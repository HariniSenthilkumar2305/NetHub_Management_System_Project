import React, { useState, useEffect } from "react";
import "./AdminOtherServices.css";

const AdminOtherServices = () => {
  const [otherServices, setOtherServices] = useState([]);
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // ✅ Filter only transactions that belong to "OtherServices.js"
    const otherServicesData = storedTransactions.filter(transaction => transaction.category === "OtherServices");

    setOtherServices(otherServicesData);
    setServiceCount(otherServicesData.length);
  }, []);

  return (
    <div className="admin-other-services-container">
      <h1>📑 Manage Other Services</h1>
      <h2>Total Services Booked: {serviceCount}</h2>

      <div className="other-services-list">
        {otherServices.length > 0 ? (
          otherServices.map((service, index) => (
            <div key={index} className="service-card">
              <p><strong>👤 User:</strong> {service.userName}</p>
              <p><strong>📅 Date:</strong> {service.date}</p>
              <p><strong>🛠 Service Type:</strong> {service.serviceType}</p>
              <p><strong>📜 Details:</strong> {service.details}</p>
              <p><strong>💰 Amount:</strong> ₹{service.amount}</p>
              <p><strong>✅ Status:</strong> {service.status}</p>
            </div>
          ))
        ) : (
          <p>No Other Services Booked Yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOtherServices;
