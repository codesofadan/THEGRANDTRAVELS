import React from "react";
import "./SecNav.css";

const SecNav = () => {
  return (
    <nav className="two-navbar">
      <ul className="navbar-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default SecNav;