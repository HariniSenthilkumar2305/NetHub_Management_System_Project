import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username); // Store username in context & localStorage
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h2>Login to NetHub</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p><a href="/register">Register Here</a></p>
        <p><a href="/forgot-password">Forgot Password?</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
