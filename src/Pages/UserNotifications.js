import React, { useState, useEffect } from "react";
import "./UserNotifications.css";

const UserNotifications = () => {
  const [userNotifications, setUserNotifications] = useState([]);

  useEffect(() => {
    const updates = JSON.parse(localStorage.getItem("userNotifications")) || [];
    setUserNotifications(updates);
  }, []);

  const handleClearNotifications = () => {
    setUserNotifications([]);
    localStorage.removeItem("userNotifications");
  };

  return (
    <div className="user-notifications-container">
      <h2>🔔 Your Notifications</h2>
      {userNotifications.length === 0 ? (
        <p>No new updates.</p>
      ) : (
        <ul>
          {userNotifications.map((update, index) => (
            <li key={index}>{update}</li>
          ))}
        </ul>
      )}
      {userNotifications.length > 0 && (
        <button onClick={handleClearNotifications}>Clear Notifications</button>
      )}
    </div>
  );
};

export default UserNotifications;
