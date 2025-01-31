import React, { useState } from "react";
import "./AdminLoginRegister.css";

const AdminLoginRegister = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`admin-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        
      </button>
      <div className="admin-image">
        <img
          src="admin2.jpg"
          alt="Adventure"
          className="admin-img"
        />
      </div>
      <div className="admin-form-container">
        <h1 className="admin-heading">The Adventure Begins Here</h1>
        <p className="admin-subheading">Make your app management easy.</p>
        <form className="admin-form">
          <div className="input-group">
            <i className="icon user-icon">👤</i>
            <input
              type="text"
              placeholder="Username"
              className="admin-input"
              required
            />
          </div>
          <div className="input-group">
            <i className="icon password-icon">🔒</i>
            <input
              type="password"
              placeholder="Password"
              className="admin-input"
              required
            />
          </div>
          <button type="button" className="admin-google-login">
            <i className="icon google-icon"></i> Login
          </button>
          <p className="admin-link">
            Already have a login? <a href="#login">Sign in here</a>
          </p>
          
        </form>
      </div>
    </div>
  );
};

export default AdminLoginRegister;
