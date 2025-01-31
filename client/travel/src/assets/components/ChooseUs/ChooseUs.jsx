import React from "react";
import "./ChooseUs.css";

const ChooseUs = () => {
  return (
    <section className="choose-us">
      <h2 className="section-title">Why Choose Us</h2>
      <div className="choose-us-content">
        <div className="choose-us-text">
          <ul>
            <li>1- Expert travel planning and personalized itineraries</li>
            <li>2- Exclusive deals and discounts on top destinations</li>
            <li>3- 24/7 customer support for a hassle-free experience</li>
            <li>4- Trusted by thousands of happy travelers</li>
            <li>5- Comprehensive travel insurance and safety measures</li>
          </ul>
          <button className="contact-button">Get in Contact</button>
        </div>
        <div className="choose-us-image">
          <img src="traveler.jpg" alt="Traveler" />
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;