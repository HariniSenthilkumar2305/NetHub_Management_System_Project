import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Pages/Navbar"; // Import Navbar
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to</h1>
          <h1>NetHub Management System</h1>
          <p>Efficient system allotment,</p>
          <p>laptop servicing, CCTV solutions,</p>
          <p>and ticket booking.</p>
          <Link to="/login" className="btn primary-btn">Get Started</Link>
        </div>
      </header>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <Link to="/system-allotment" className="service-card">
            <h3>System Allotment</h3>
            <p>Book a system based on your time usage.</p>
          </Link>
          <Link to="/laptop-service" className="service-card">
            <h3>Laptop Services</h3>
            <p>Request servicing for your laptops.</p>
          </Link>
          <Link to="/cctv-service" className="service-card">
            <h3>CCTV Services</h3>
            <p>Get CCTV installation and repairs.</p>
          </Link>
        </div>
      </section>

      {/* Ticket Booking Section */}
      <section className="ticket-booking">
        <h2>Book Your Tickets</h2>
        <div className="ticket-options">
          <Link to="/book-flight" className="ticket-card">
            <h3>Flight Tickets</h3>
            <p>Book flights to your destination.</p>
          </Link>
          <Link to="/book-train" className="ticket-card">
            <h3>Train Tickets</h3>
            <p>Reserve train seats easily.</p>
          </Link>
          <Link to="/book-bus" className="ticket-card">
            <h3>Bus Tickets</h3>
            <p>Find the best bus options.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
