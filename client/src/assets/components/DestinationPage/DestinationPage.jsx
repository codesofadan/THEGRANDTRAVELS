// Updated JSX: DestinationPage.jsx
import React, { useEffect, useRef } from 'react';
import './DestinationPage.css';

const destinations = [
  {
    name: 'Lahore',
    image: 'https://images.pexels.com/photos/2383832/pexels-photo-2383832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    bestThing: 'Historical Sites',
    bestFood: 'Nihari',
    history: 'Lahore is known for its rich Mughal history and vibrant culture.',
  },
  {
    name: 'Islamabad',
    image: 'https://images.pexels.com/photos/16693762/pexels-photo-16693762/free-photo-of-faisal-masjid-in-islamabad.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    bestThing: 'Scenic Beauty',
    bestFood: 'Kebabs',
    history: 'Islamabad is Pakistan’s capital, known for its modern infrastructure and greenery.',
  },
  {
    name: 'Dubai',
    image: 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    bestThing: 'Luxury Shopping',
    bestFood: 'Shawarma',
    history: 'Dubai is a global city famous for its ultramodern architecture.',
  },
  {
    name: 'New York',
    image: 'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    bestThing: 'Broadway Shows',
    bestFood: 'Pizza',
    history: 'New York is the cultural and financial capital of the world.',
  },
  {
    name: 'Baku',
    image: 'https://images.pexels.com/photos/2716795/pexels-photo-2716795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    bestThing: 'Modern Architecture',
    bestFood: 'Plov',
    history: 'Baku is the capital of Azerbaijan, blending old city charm with modernity.',
  },
  {
    name: 'Taj Mahal',
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5.0,
    bestThing: 'Iconic Landmark',
    bestFood: 'Mughlai Cuisine',
    history: 'The Taj Mahal is a UNESCO World Heritage site built by Mughal Emperor Shah Jahan.',
  },
  {
    name: 'Paris',
    image: 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    bestThing: 'Eiffel Tower',
    bestFood: 'Croissants',
    history: 'Paris is the city of love, known for its art, fashion, and culture.',
  },
  {
    name: 'London',
    image: 'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    bestThing: 'British Museum',
    bestFood: 'Fish and Chips',
    history: 'London is the capital of England, known for its history and diversity.',
  },
  {
    name: 'Istanbul',
    image: 'https://images.pexels.com/photos/2159549/pexels-photo-2159549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    bestThing: 'Blue Mosque',
    bestFood: 'Kebabs',
    history: 'Istanbul is a city that straddles Europe and Asia across the Bosphorus Strait.',
  },
];

const DestinationPage = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          card.classList.add('in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="destination-page">
      <header className="page-header">
        <h1>Your Next Adventure Awaits</h1>
        <p>Explore the world’s most iconic destinations, one city at a time.</p>
      </header>

      <div className="destination-list">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="destination-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <img src={destination.image} alt={destination.name} className="destination-banner" />
            <div className="destination-info">
              <h2>{destination.name}</h2>
              <p><strong>Rating:</strong> {destination.rating} ⭐</p>
              <p><strong>Best Thing:</strong> {destination.bestThing}</p>
              <p><strong>Best Food:</strong> {destination.bestFood}</p>
              <p>{destination.history}</p>
              <div className="action-buttons">
                <button className="book-button">Book Hotel</button>
                <button className="book-button">Book Flight</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
