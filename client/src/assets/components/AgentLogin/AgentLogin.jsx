import React from "react";
import "./AgentLogin.css";

const AgentLogin = () => {
  return (
    <div className="agent-login-container">
      <div className="agent-login-content">
        <h1 className="agent-heading">Welcome, Travel Agent</h1>
        <p className="agent-subtext">
          Login or register to manage your travel bookings and access exclusive deals.
        </p>
        <form className="agent-form">
          <input
            type="text"
            placeholder="Agent ID"
            className="agent-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="agent-input"
            required
          />
          <button type="submit" className="agent-button">
            Login
          </button>
          <button type="button" className="agent-button register">
            Register
          </button>
        </form>
        <button className="contact-admin-button">
          Contact Admin
        </button>
      </div>
      <div className="agent-login-image">
        <img
          src="agent.jpg" width="700" height="700"
          alt="Travel Agent"
          className="agent-image"
        />
      </div>
    </div>
  );
};

export default AgentLogin;
