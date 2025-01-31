import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>
      <div className="contact-content">
        <form className="contact-form">
          <input
            type="text"
            placeholder="Name"
            className="contact-input"
          />
          <input
            type="email"
            placeholder="Email"
            className="contact-input"
          />
          <textarea
            placeholder="Message"
            className="contact-input contact-message"
          ></textarea>
          <button type="submit" className="contact-button">
            Submit
          </button>
        </form>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.6285797830556!2d-1.7154762231782865!3d53.79609787242319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487be182d87464a3%3A0x712c492f486fa26a!2sThe%20Grand%20Travel!5e0!3m2!1sen!2s!4v1736078519861!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;