import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminVerificationPage.css";

// Predefined admin credentials (secure information)
const ADMIN_CREDENTIALS = {
  username: "Harini S",
  password: "harini2005",
  nethubPin: "12345",
};

const AdminVerificationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nethubPin: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, nethubPin } = formData;

    // Check if entered details match admin credentials
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password &&
      nethubPin === ADMIN_CREDENTIALS.nethubPin
    ) {
      navigate("/admin-dashboard"); // Redirect to Admin Dashboard
    } else {
      alert("❌ You are not an admin!"); // Show pop-up alert
      navigate("/dashboard"); // Redirect back to Dashboard
    }
  };

  return (
    <div className="admin-verification-container">
      <div className="verification-box">
        <h2>Admin Verification</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Admin Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Admin Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>NetHub PIN:</label>
          <input
            type="password"
            name="nethubPin"
            placeholder="Enter NetHub PIN"
            value={formData.nethubPin}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdminVerificationPage;
