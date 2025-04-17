import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPageLaptopService.css";

const ConfirmationPageLaptopService = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { serviceName, brand, model, issueType, description, totalAmount } = location.state || {};

    return (
        <div className="confirmation-container">
            <div className="confirmation-box">
                <h2>✅ Payment Successful</h2>
                <p>Thank you for choosing our Laptop Service.</p>
                <div className="confirmation-details">
                    <p><strong>Service:</strong> {serviceName}</p>
                    <p><strong>Laptop:</strong> {brand} {model}</p>
                    <p><strong>Issue Type:</strong> {issueType}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Total Paid:</strong> ₹{totalAmount}</p>
                </div>
                <button className="back-home-btn" onClick={() => navigate("/Dashboard")}>🏠 Back to Home</button>
            </div>
        </div>
    );
};

export default ConfirmationPageLaptopService;
