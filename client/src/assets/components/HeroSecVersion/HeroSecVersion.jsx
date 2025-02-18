import React, { useState, useEffect } from "react";
import "./HeroSecVersion.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchPopupImage } from "../../services/api";

const HeroSecVersion = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [popupImage, setPopupImage] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const data = await fetchPopupImage();
      setPopupImage(data.imageUrl);
    };
    getImage();
  }, []);

  return (
    <div className="hero-section">
      <video autoPlay loop muted className="hero-video">
        <source
          src="https://videos.pexels.com/video-files/2897277/2897277-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero-overlay">
        <h1>Where travel meets<br /> luxury and Safety</h1>
        <SearchBar />
      </div>

      {isModalOpen && popupImage && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <img src={popupImage} alt="Special Offer" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSecVersion;
