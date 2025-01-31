import React from "react";
import "./HeroSection.css";
import SearchBar from "../SearchBar/SearchBar";

const HeroSection = () => {
  return (
    <section className="hero-section">

      {/* Title */}
      <h1 className="hero-title">Your Next Grand Travel</h1>

      {/* Slider */}
      <div className="slider">
        <div className="slider-track">
          {/* Duplicated Images */}
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={i}>
              <img src="s1.png" alt="Card 1" className="slider-card" />
              <img src="s2.png" alt="Card 2" className="slider-card" />
              <img src="s3.png" alt="Card 3" className="slider-card" />
              <img src="s4.png" alt="Card 4" className="slider-card" />
            </React.Fragment>
          ))}
        </div>
      </div>

      <SearchBar />
    </section>
  );
};

export default HeroSection;
