import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Destinations.css";

const Destinations = () => {
  const images = [
    "Destination1.jpg",
    "Destination2.jpg",
    "Destination3.jpg",
    "Destination4.jpg",
    "Destination5.jpg",
    "Destination6.jpg",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target); // Stop observing after animation is applied
          }
        });
      },
      {
        threshold: 0.1, // Trigger animation when 10% of the element is visible
      }
    );

    const elements = document.querySelectorAll(".bento-image");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="destinations-container">
      <h1 className="section-title">Our Top Destinations</h1>
      <div className="bento-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Destination ${index + 1}`}
            className={`bento-image`}
          />
        ))}
      </div>
      {/* <Link to="/destinations">
        <button className="load-more-btn">Load More</button>
      </Link> */}
    </div>
  );
};

export default Destinations;