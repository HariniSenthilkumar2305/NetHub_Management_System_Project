import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  const login = (username) => {
    setUser(username);
    localStorage.setItem("user", username); // Store in localStorage
  };

  const logout = () => {
    setUser("");
    localStorage.removeItem("user"); // Remove on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
