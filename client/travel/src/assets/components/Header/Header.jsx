import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-left">
        <a href="/">
          <img
            src="logo12.png"
            alt="Logo"
            className="header-logo"
          />
        </a>
      </div>
      <div className="header-center">
        <div className="header-links">
          <a href="/destinations">Destinations</a>
          <a href="/packages">Packages</a>
          <a href="/flights">Flights</a>
          <a href="/hotels">Hotels</a>
          <a href="/faq">FAQ</a>
          
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className="header-right">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <a href="/destinations">Destinations</a>
            <a href="/packages">Packages</a>
            <a href="/testimonials">Testimonials</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact</a>
            <a href="/signup">SignUp</a>
            <a href="/login">Login</a>
            <a href="/hotels">Hotels</a>
            <a href="/flights">Flights</a>
            
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;