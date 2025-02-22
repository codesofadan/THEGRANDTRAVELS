import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import the WhatsApp icon from react-icons
import './WhatsAppButton.css'; // Import the CSS file for styling

const WhatsAppButton = () => {
  const phoneNumber = 'YOUR_PHONE_NUMBER'; // Replace with your WhatsApp phone number
  const message = 'Hello, I would like to inquire about...'; // Default message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <FaWhatsapp style={{ fontSize: 40, color: '#25D366' }} />
    </div>
  );
};

export default WhatsAppButton;