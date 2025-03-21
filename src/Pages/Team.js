import React from "react";
import "./Team.css";

const Team = () => {
  return (
    <div className="team-container">
      <h1>Our Team</h1>
      <p>Meet the dedicated professionals behind NetHub.</p>
      <div className="team-members">
        <div className="member">
          <h3>John Doe</h3>
          <p>Founder & CEO</p>
        </div>
        <div className="member">
          <h3>Jane Smith</h3>
          <p>Lead Developer</p>
        </div>
        <div className="member">
          <h3>Mark Johnson</h3>
          <p>Customer Support</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
