import React, { useState } from "react";
import "./HeroSecVersion.css";
import SearchBar from "../SearchBar/SearchBar";

const HeroSecVersion = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Function to close the modal
  const closeModal = (e) => {
    if (e.target.className === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="hero-section">
      <video autoPlay loop muted className="hero-video">
        <source
          src="https://videos.pexels.com/video-files/2897277/2897277-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay">
        <h1>Where travel meets<br /> luxury and Safety</h1>
        <SearchBar />
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img
              src="modaloffer.jpeg"
              alt="Special Package Offer"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSecVersion;
