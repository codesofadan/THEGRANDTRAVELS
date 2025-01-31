import React from "react";
import { Link } from "react-router-dom";
import "./DestinHero.css"; // Custom CSS for styling

const DestinHero = () => {
    return (
        <div className="hero-section">
            <div className="hero-image">
                <img src="./destinationsheroimg.jpg" alt="Beautiful Mountain" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                
            </div>
        </div>
    );
};

export default DestinHero;
