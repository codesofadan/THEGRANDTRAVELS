import React, { useEffect, useRef } from 'react';
import './PackagesSection.css';

const packages = [
    {
        name: 'Umrah Package',
        price: '$1500',
        benefits: ['Visa Included', '5-Star Hotels', 'Airport Pickup'],
        meals: ['Breakfast Included', 'Dinner Included'],
        rating: 4.9,
        duration: '7 Days',
        hotels: ['Makkah Palace', 'Medina Hilton'],
        image: 'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'London Package',
        price: '$2500',
        benefits: ['City Tour', 'Museum Pass', 'Hop-On-Hop-Off Bus'],
        meals: ['Breakfast Included', 'Dinner Not Included'],
        rating: 4.8,
        duration: '5 Days',
        hotels: ['The Ritz London', 'Hilton London Kensington'],
        image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Maldives Package',
        price: '$4000',
        benefits: ['Overwater Villa', 'Private Beach Access', 'Snorkeling Gear'],
        meals: ['All Meals Included'],
        rating: 5.0,
        duration: '7 Days',
        hotels: ['Sunset Paradise Resort'],
        image: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Turkey Package',
        price: '$2000',
        benefits: ['Istanbul City Tour', 'Cappadocia Hot Air Balloon'],
        meals: ['Breakfast Included', 'Dinner Included'],
        rating: 4.7,
        duration: '6 Days',
        hotels: ['Swissotel Istanbul', 'Cappadocia Inn'],
        image: 'https://images.pexels.com/photos/2668314/pexels-photo-2668314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
        {
        name: 'Paris Package',
        price: '$3000',
        benefits: ['Eiffel Tower Tour', 'Louvre Museum Pass'],
        meals: ['Breakfast Included', 'Dinner Not Included'],
        rating: 4.9,
        duration: '5 Days',
        hotels: ['The Westin Paris', 'Hilton Paris Opera'],
        image: 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
        name: 'Dubai Package',
        price: '$3500',
        benefits: ['Desert Safari', 'Burj Khalifa Tour', 'Dubai Mall Pass'],
        meals: ['Breakfast Included', 'Dinner Included'],
        rating: 4.8,
        duration: '6 Days',
        hotels: ['Atlantis The Palm', 'Jumeirah Beach Hotel'],
        image: 'https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
        name: 'New York Package',
        price: '$2800',
        benefits: ['Broadway Show Tickets', 'Empire State Building Pass'],
        meals: ['Breakfast Included', 'Dinner Not Included'],
        rating: 4.9,
        duration: '5 Days',
        hotels: ['The Plaza Hotel', 'The Ritz-Carlton New York'],
        image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
        name: 'Bali Package',
        price: '$3200',
        benefits: ['Ubud Tour', 'Beach Resort Stay'],
        meals: ['Breakfast Included', 'Dinner Included'],
        rating: 4.7,
        duration: '7 Days',
        hotels: ['The St. Regis Bali Resort', 'Conrad Bali'],
        image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
  // Your existing package data...
];

const PackagesSection = () => {
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
    <div className="packages-section">
      <header className="section-header">
        <h1>Exclusive Travel Packages</h1>
        <p>Explore premium travel experiences tailored for you.</p>
      </header>

      <div className="packages-list">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="package-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <img src={pkg.image} alt={pkg.name} className="package-image" />
            <div className="package-details">
              <h2>{pkg.name}</h2>
              <p><strong>Price:</strong> {pkg.price}</p>
              <p><strong>Duration:</strong> {pkg.duration}</p>
              <p><strong>Rating:</strong> {pkg.rating} ⭐</p>
              <p><strong>Hotels:</strong> {pkg.hotels.join(', ')}</p>
              <p><strong>Meals:</strong> {pkg.meals.join(' | ')}</p>
              <p><strong>Benefits:</strong></p>
              <ul>
                {pkg.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
              <button className="book-button">Book this Package</button>
            </div>
          </div>
        ))}
      </div>

      <div className="custom-package-button">
        <button>Contact Admin for Custom Packages</button>
      </div>
    </div>
  );
};

export default PackagesSection;
