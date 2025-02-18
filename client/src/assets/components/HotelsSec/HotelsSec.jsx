import React from 'react';
import { Link } from 'react-router-dom';
import './HotelsSec.css';

const hotels = [
  // ...existing code...
  {
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with actual image paths
    name: 'Hotel Sunshine',
    rating: 4.5,
    price: '$120/night',
    location: 'New York, USA',
    description: 'A luxurious hotel with stunning views and excellent amenities.',
  },
  {
    image: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with actual image paths
    name: 'Ocean Breeze Resort',
    rating: 4.7,
    price: '$150/night',
    location: 'Miami, USA',
    description: 'Experience the best of beachside living with top-notch services.',
  },
  {
    image: 'https://images.pexels.com/photos/2306280/pexels-photo-2306280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with actual image paths
    name: 'Mountain Retreat',
    rating: 4.8,
    price: '$200/night',
    location: 'Denver, USA',
    description: 'A serene retreat in the mountains with breathtaking views.',
  },
];

const HotelsSec = () => {
  return (
    <section className="hotels-section">
      <h2 className="section-heading">Our Hotels Choice</h2>
      <div className="hotels-container">
        {hotels.map((hotel, index) => (
          <div className="hotel-card" key={index}>
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <div className="hotel-info">
              <h3 className="hotel-name">{hotel.name}</h3>
              <p className="hotel-rating">Rating: {hotel.rating} ⭐</p>
              <p className="hotel-price">{hotel.price}</p>
              <p className="hotel-location">{hotel.location}</p>
              <p className="hotel-description">{hotel.description}</p>
              <Link to="/bookings" className="book-button">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelsSec;