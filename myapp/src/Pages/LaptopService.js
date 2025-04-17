import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LaptopService.css";

const LaptopService = () => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [issueType, setIssueType] = useState("");
    const [description, setDescription] = useState("");   
    const [status, setStatus] = useState("Pending");
    const [serviceCost, setServiceCost] = useState(null);
    const [expectedCompletion, setExpectedCompletion] = useState("");
    const navigate = useNavigate();

    // Auto-generate expected completion date (7 days from today)
    const generateCompletionDate = () => {
        const today = new Date();
        const completionDate = new Date(today.setDate(today.getDate() + 7));
        return completionDate.toDateString();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cost = (Math.random() * (5000 - 500) + 500).toFixed(2); // Random cost between ₹500 - ₹5000
        const completionDate = generateCompletionDate();
    
        const newRequest = {
            brand,
            model,
            issueType,
            description,
            status: "Pending",
            serviceCost: cost,
            expectedCompletion: completionDate,
        };
    
        // Save request in localStorage
        const existingRequests = JSON.parse(localStorage.getItem("laptopServiceRequests")) || [];
        existingRequests.push(newRequest);
        localStorage.setItem("laptopServiceRequests", JSON.stringify(existingRequests));
    
        setServiceCost(cost);
        setExpectedCompletion(completionDate);
    };
    

    // Redirect to Payment Page
    const handleProceedToPayment = () => {
        navigate("/payment-laptop-service", {
            state: {
                serviceName: "Laptop Service",
                brand,
                model,
                issueType,
                description,
                totalAmount: serviceCost,
                details: `${brand} ${model} - ${issueType} Issue`,
            },
        });
    };

    return (
        <div className="laptop-service-container">
            <div className="content-wrapper">
                {/* Left Side - Service Information */}
                <div className="left-section">
                    <h1>🔧 Best Laptop Service</h1>
                    <p>We provide high-quality laptop servicing.</p>
                    <ul>
                        <li>- Fast & Reliable Service</li>
                        <li>- Genuine Spare Parts</li>
                        <li>- Affordable Pricing</li>
                        <li>- Customer Satisfaction Guaranteed</li>
                    </ul>
                </div>

                {/* Right Side - Customer Form */}
                <div className="right-section">
                    <h2>Service Request Form</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Laptop Brand:</label>
                        <input 
                            type="text" 
                            placeholder="Enter brand (e.g., Dell, HP)" 
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)} 
                            required 
                        />

                        <label>Model:</label>
                        <input 
                            type="text" 
                            placeholder="Enter model number" 
                            value={model} 
                            onChange={(e) => setModel(e.target.value)} 
                            required 
                        />

                        <label>Issue Type:</label>
                        <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
                            <option value="">Select an Issue</option>
                            <option value="Battery">Battery Issue</option>
                            <option value="Display">Display Issue</option>
                            <option value="Software">Software Issue</option>
                            <option value="Keyboard">Keyboard Issue</option>
                            <option value="Other">Other</option>
                        </select>

                        <label>Issue Description:</label>
                        <textarea 
                            placeholder="Briefly describe the issue..." 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required 
                        />

                        <button type="submit">Submit Request</button>
                    </form>

                    {/* Service Details Section */}
                    {serviceCost && (
                        <div className="service-details">
                            <h3>📢 Service Details</h3>
                            <p><strong>Service Cost Estimate:</strong> ₹{serviceCost}</p>
                            <p><strong>Expected Completion:</strong> {expectedCompletion}</p>
                            <p><strong>Status:</strong> {status}</p>
                        </div>
                    )}

                    {/* Payment Button */}
                    {serviceCost && (
                        <button className="proceed-payment-btn" onClick={handleProceedToPayment}>
                            💳 Proceed to Payment
                        </button>
                    )}

                    {/* Status Update Buttons (Admin Functionality) */}
                    {serviceCost && (
                        <div className="status-buttons">
                            <button onClick={() => setStatus("In Progress")}>🔄 Mark as In Progress</button>
                            <button onClick={() => setStatus("Completed")}>✅ Mark as Completed</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LaptopService;
