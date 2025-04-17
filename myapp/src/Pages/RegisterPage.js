import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";  

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Save user details (You can store them in localStorage or call an API)
    localStorage.setItem("registeredUser", JSON.stringify(formData));
    
    alert("Registration successful! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="register-page"> {/* Apply specific background */}
      <div className="auth-container">
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login Here</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
