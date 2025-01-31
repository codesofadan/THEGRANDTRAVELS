import React from 'react';
import './Ticker.css';

const Ticker = () => {
  const logos = [
    'air1.png',
    'air2.png',
    'air3.png',
    'air4.png',
    'air5.png',
    'air6.png',
    'air7.png',
    'air8.png',
    'air9.png',
    'air10.png',
    'air2.png',
    'air3.png',
    'air4.png',
    'air5.png',
    'air6.png',
    'air7.png',
    'air8.png',
  ];

  // Duplicate logos infinitely by rendering multiple copies
  const infiniteLogos = [...logos, ...logos, ...logos]; // Extend as needed for smooth scrolling

  return (
    <div className="logo-ticker">
      <div className="ticker-container">
        {infiniteLogos.map((logo, index) => (
          <img key={index} src={logo} alt={`Logo ${index + 1}`} className="ticker-logo" />
        ))}
      </div>
    </div>
  );
};

export default Ticker;
