import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">NetHub</div>
      <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
