import React from "react";
import { Link } from "react-router-dom";
import "./FlightDeals.css";

const flightData = [
  { city: "Brisbane", dates: "13 Jan - 17 Jan", price: "€59", image: "https://images.pexels.com/photos/416056/pexels-photo-416056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { city: "Hong Kong", dates: "23 Feb - 27 Feb", price: "€61", image: "https://images.pexels.com/photos/1337144/pexels-photo-1337144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { city: "Dubai", dates: "4 Feb - 7 Feb", price: "€70", image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { city: "Spain", dates: "4 Mar - 9 Mar", price: "€57", image: "https://images.pexels.com/photos/175934/pexels-photo-175934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { city: "Columbus", dates: "11 Feb - 15 Feb", price: "€83", image: "https://images.pexels.com/photos/8331317/pexels-photo-8331317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { city: "Bali", dates: "15 Feb - 18 Feb", price: "€67", image: "https://images.pexels.com/photos/1329510/pexels-photo-1329510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { city: "Karachi", dates: "12 Feb - 19 Feb", price: "€44", image: "https://images.pexels.com/photos/7244482/pexels-photo-7244482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { city: "Cairo", dates: "30 Jan - 2 Feb", price: "€50", image: "https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const FlightCard = ({ city, dates, price, image }) => (
  <div className="flight-card">
    <div className="circle-overlay"></div>
    <div className="shadow-circle"></div>
    <div className="flight-image-container">
      <img src={image} alt={city} className="flight-image" />
    </div>
    <div className="flight-info">
      <p className="flight-dates">{dates}</p>
      <h3 className="flight-city">{city}</h3>
      <p className="flight-price">Avail at <span>{price}</span></p>
      <Link to="/bookings">
        <button className="book-button">Book Now</button>
      </Link>
    </div>
  </div>
);

const FlightDeals = () => (
  <section className="flight-deals">
    <h2>Prime Flight Deals</h2>
    <p>Save big and visit these dream destinations!</p>
    <div className="flight-grid">
      {flightData.map((deal, index) => (
        <FlightCard key={index} {...deal} />
      ))}
    </div>
  </section>
);

export default FlightDeals;