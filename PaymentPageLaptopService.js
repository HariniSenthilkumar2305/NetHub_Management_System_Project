import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPageLaptopService.css";

const PaymentPageLaptopService = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { serviceName, brand, model, issueType, description, totalAmount, details } = location.state || {};

    const handlePayment = () => {
        navigate("/confirmation-laptop-service", {
            state: {
                serviceName,
                brand,
                model,
                issueType,
                description,
                totalAmount,
                details,
            },
        });
    };

    return (
        <div className="laptop-payment-container">
            <div className="laptop-payment-box">
                <h2>💳 Payment for Laptop Service</h2>
                <div className="payment-details">
                    <p><strong>Service:</strong> {serviceName}</p>
                    <p><strong>Laptop:</strong> {brand} {model}</p>
                    <p><strong>Issue Type:</strong> {issueType}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
                </div>
                <button className="pay-now-btn" onClick={handlePayment}>✅ Pay Now</button>
            </div>
        </div>
    );
};

export default PaymentPageLaptopService;
