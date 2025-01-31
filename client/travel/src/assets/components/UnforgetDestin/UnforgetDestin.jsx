import React from "react";
import "./UnforgetDestin.css";

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    rating: "4.9",
    price: "$1200",
    image: "bali.jpg",
    usp: "Beautiful beaches and vibrant culture",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    rating: "4.8",
    price: "$1500",
    image: "bali.jpg",
    usp: "Historic temples and stunning gardens",
  },
  {
    id: 3,
    name: "Paris, France",
    rating: "4.7",
    price: "$2000",
    image: "bali.jpg",
    usp: "Iconic landmarks and romantic atmosphere",
  },
  {
    id: 4,
    name: "New York, USA",
    rating: "4.6",
    price: "$1800",
    image: "bali.jpg",
    usp: "Skyscrapers and vibrant nightlife",
  },
  {
    id: 5,
    name: "Sydney, Australia",
    rating: "4.7",
    price: "$1700",
    image: "bali.jpg",
    usp: "Opera House and beautiful harbor",
  },
  {
    id: 6,
    name: "Cape Town, South Africa",
    rating: "4.8",
    price: "$1600",
    image: "bali.jpg",
    usp: "Stunning landscapes and rich history",
  },
];

const UnforgetDestin = () => {
  return (
    <div className="unforget-destin">
      <h2>6 Unforgettable Destinations in 2024</h2>
      <div className="destinations-slider">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <div className="destination-info">
              <h3>{destination.name}</h3>
              <p>Rating: {destination.rating}</p>
              <p>Price: {destination.price}</p>
            </div>
            <div className="destination-usp">
              <p>{destination.usp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnforgetDestin;