import React, { useState } from 'react';
import './HotelSection.css';

const hotels = [
  {
    name: 'Oceanview Resort',
    price: '$150/night',
    rating: 4.8,
    food: 'Breakfast & Dinner Included',
    features: ['Pool', 'Beach Access', 'Free Wi-Fi'],
    usp: 'Ocean view with private pool',
    contact: '123-456-7890',
    image: 'https://images.pexels.com/photos/29715958/pexels-photo-29715958/free-photo-of-woman-taking-photos-on-a-seaside-beach.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Mountain Retreat',
    price: '$200/night',
    rating: 4.5,
    food: 'Breakfast Included',
    features: ['Mountain View', 'Spa', 'Gym'],
    usp: 'Perfect for nature lovers',
    contact: '123-456-7891',
    image: 'https://images.pexels.com/photos/7276971/pexels-photo-7276971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'City Center Hotel',
    price: '$120/night',
    rating: 4.2,
    food: 'No Meals Included',
    features: ['City View', 'Bar', '24-Hour Concierge'],
    usp: 'Best located in the city center',
    contact: '123-456-7892',
    image: 'https://images.pexels.com/photos/29397793/pexels-photo-29397793/free-photo-of-iconic-clock-tower-in-madrid-spain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Seaside Inn',
    price: '$130/night',
    rating: 4.7,
    food: 'Dinner Included',
    features: ['Beach Access', 'Free Parking', 'Outdoor Pool'],
    usp: 'Seafront with all-inclusive dinner',
    contact: '123-456-7893',
    image: 'https://images.pexels.com/photos/12843138/pexels-photo-12843138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Lakeside Lodge',
    price: '$180/night',
    rating: 4.6,
    food: 'Breakfast & Lunch Included',
    features: ['Lake View', 'Fishing', 'Hiking Trails'],
    usp: 'Perfect for adventure and nature lovers',
    contact: '123-456-7894',
    image: 'https://images.pexels.com/photos/1592459/pexels-photo-1592459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Royal Palace Hotel',
    price: '$250/night',
    rating: 5.0,
    food: 'All Meals Included',
    features: ['Luxury Spa', 'Fine Dining', 'Personalized Service'],
    usp: 'Luxurious experience fit for royalty',
    contact: '123-456-7895',
    image: 'https://images.pexels.com/photos/16192534/pexels-photo-16192534/free-photo-of-schloss-hernstein-hotel-in-austria.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Sunset Beach Resort',
    price: '$220/night',
    rating: 4.9,
    food: 'Breakfast & Dinner Included',
    features: ['Beachfront', 'Jacuzzi', 'Private Cabanas'],
    usp: 'Unmatched sunset views',
    contact: '123-456-7896',
    image: 'https://images.pexels.com/photos/2433467/pexels-photo-2433467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Desert Oasis Hotel',
    price: '$170/night',
    rating: 4.3,
    food: 'No Meals Included',
    features: ['Desert View', 'Camel Rides', 'Luxury Tents'],
    usp: 'Experience the magic of the desert',
    contact: '123-456-7897',
    image: 'https://images.pexels.com/photos/626660/pexels-photo-626660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Hilltop Getaway',
    price: '$210/night',
    rating: 4.4,
    food: 'Breakfast Included',
    features: ['Mountain View', 'Private Hiking Trails', 'Heated Pool'],
    usp: 'Escape to the serenity of the mountains',
    contact: '123-456-7898',
    image: 'https://images.pexels.com/photos/7868989/pexels-photo-7868989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Garden View Hotel',
    price: '$100/night',
    rating: 4.1,
    food: 'Breakfast Included',
    features: ['Garden View', 'Swimming Pool', 'Pet Friendly'],
    usp: 'Escape into tranquility in our beautiful gardens',
    contact: '123-456-7899',
    image: 'https://images.pexels.com/photos/6130060/pexels-photo-6130060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Urban Stay Inn',
    price: '$130/night',
    rating: 4.0,
    food: 'No Meals Included',
    features: ['City Center', 'Free Wi-Fi', 'Co-working Space'],
    usp: 'Ideal for business travelers in the heart of the city',
    contact: '123-456-7900',
    image: 'https://via.placeholder.com/500x300?text=Urban+Stay+Inn',
  },
  {
    name: 'Luxury Hills Resort',
    price: '$270/night',
    rating: 4.8,
    food: 'All Meals Included',
    features: ['Mountain View', 'Infinity Pool', 'Private Villas'],
    usp: 'Exclusive luxury escape in the hills',
    contact: '123-456-7901',
    image: 'https://via.placeholder.com/500x300?text=Luxury+Hills+Resort',
  },
  {
    name: 'Seaview Lodge',
    price: '$160/night',
    rating: 4.3,
    food: 'Lunch & Dinner Included',
    features: ['Beach Access', 'Fishing', 'Outdoor Activities'],
    usp: 'Perfect place for water sport enthusiasts',
    contact: '123-456-7902',
    image: 'https://via.placeholder.com/500x300?text=Seaview+Lodge',
  },
  {
    name: 'Skyline Hotel',
    price: '$180/night',
    rating: 4.7,
    food: 'Breakfast Included',
    features: ['City View', 'Rooftop Bar', 'Spa'],
    usp: 'Breathtaking skyline views with luxury',
    contact: '123-456-7903',
    image: 'https://via.placeholder.com/500x300?text=Skyline+Hotel',
  },
  {
    name: 'Eco Nature Retreat',
    price: '$140/night',
    rating: 4.2,
    food: 'Organic Meals Included',
    features: ['Eco-Friendly', 'Hiking', 'Yoga'],
    usp: 'Reconnect with nature in an eco-conscious retreat',
    contact: '123-456-7904',
    image: 'https://via.placeholder.com/500x300?text=Eco+Nature+Retreat',
  },
  {
    name: 'Grand Mountain Resort',
    price: '$300/night',
    rating: 5.0,
    food: 'All Meals Included',
    features: ['Skiing', 'Mountain View', 'Spa'],
    usp: 'A ski lover’s paradise in the mountains',
    contact: '123-456-7905',
    image: 'https://via.placeholder.com/500x300?text=Grand+Mountain+Resort',
  },
  {
    name: 'Island Paradise Hotel',
    price: '$350/night',
    rating: 5.0,
    food: 'Breakfast, Lunch & Dinner Included',
    features: ['Private Beach', 'Spa', 'Water Sports'],
    usp: 'A luxurious tropical escape',
    contact: '123-456-7906',
    image: 'https://via.placeholder.com/500x300?text=Island+Paradise+Hotel',
  },
  {
    name: 'City View Tower Hotel',
    price: '$110/night',
    rating: 4.4,
    food: 'No Meals Included',
    features: ['City View', 'Fitness Center', '24-Hour Front Desk'],
    usp: 'Stay in the heart of the city with amazing views',
    contact: '123-456-7907',
    image: 'https://via.placeholder.com/500x300?text=City+View+Tower+Hotel',
  },
  {
    name: 'Luxury Garden Resort',
    price: '$190/night',
    rating: 4.7,
    food: 'Breakfast Included',
    features: ['Garden View', 'Outdoor Dining', 'Free Wi-Fi'],
    usp: 'An oasis of calm and beauty',
    contact: '123-456-7908',
    image: 'https://via.placeholder.com/500x300?text=Luxury+Garden+Resort',
  },
  {
    name: 'Sunshine Retreat',
    price: '$210/night',
    rating: 4.9,
    food: 'All Meals Included',
    features: ['Private Beach', 'Spa', 'Yoga Retreat'],
    usp: 'Wellness and relaxation in the sun',
    contact: '123-456-7909',
    image: 'https://via.placeholder.com/500x300?text=Sunshine+Retreat',
  },
  {
    name: 'Country Inn & Suites',
    price: '$140/night',
    rating: 4.1,
    food: 'Breakfast Included',
    features: ['Countryside Views', 'Pet Friendly', '24-Hour Concierge'],
    usp: 'Experience countryside charm with modern amenities',
    contact: '123-456-7910',
    image: 'https://via.placeholder.com/500x300?text=Country+Inn+%26+Suites',
  },
  {
    name: 'Tropical Escape Resort',
    price: '$260/night',
    rating: 4.9,
    food: 'Dinner Included',
    features: ['Private Villas', 'Infinity Pool', 'Water Activities'],
    usp: 'Luxury tropical experience on a private island',
    contact: '123-456-7911',
    image: 'https://via.placeholder.com/500x300?text=Tropical+Escape+Resort',
  },
  {
    name: 'Coastal Breeze Hotel',
    price: '$170/night',
    rating: 4.3,
    food: 'Breakfast Included',
    features: ['Ocean View', 'Beach Access', 'Outdoor Bar'],
    usp: 'Relax and unwind by the ocean',
    contact: '123-456-7912',
    image: 'https://via.placeholder.com/500x300?text=Coastal+Breeze+Hotel',
  },
  {
    name: 'Snowfall Lodge',
    price: '$240/night',
    rating: 4.8,
    food: 'All Meals Included',
    features: ['Skiing', 'Mountain View', 'Hot Tub'],
    usp: 'Snowy retreat with cozy comfort',
    contact: '123-456-7913',
    image: 'https://via.placeholder.com/500x300?text=Snowfall+Lodge',
  },
  {
    name: 'Beachfront Villas',
    price: '$300/night',
    rating: 5.0,
    food: 'No Meals Included',
    features: ['Private Beach', 'Luxury Villas', 'Water Sports'],
    usp: 'Exclusive beachfront luxury',
    contact: '123-456-7914',
    image: 'https://via.placeholder.com/500x300?text=Beachfront+Villas',
  }
];


const HotelSection = () => {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [filters, setFilters] = useState({
    price: '',
    rating: '',
    food: '',
    features: [],
    place: '',
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters((prev) => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter((item) => item !== value),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filterHotels = () => {
    let filtered = hotels;

    if (filters.price) {
      filtered = filtered.filter((hotel) => hotel.price === filters.price);
    }

    if (filters.rating) {
      filtered = filtered.filter((hotel) => hotel.rating >= filters.rating);
    }

    if (filters.food) {
      filtered = filtered.filter((hotel) => hotel.food.includes(filters.food));
    }

    if (filters.features.length) {
      filtered = filtered.filter((hotel) =>
        filters.features.every((feature) => hotel.features.includes(feature))
      );
    }

    if (filters.place) {
      filtered = filtered.filter((hotel) => hotel.name.toLowerCase().includes(filters.place.toLowerCase()));
    }

    setFilteredHotels(filtered);
  };

  return (
    <div className="hotel-section">
      <div className="filter-bar">
        <h3>Filter by:</h3>

        {/* Price Filter */}
        <div>
          <label>Price:</label>
          <select name="price" onChange={handleFilterChange}>
            <option value="">Select Price</option>
            <option value="$120/night">$120/night</option>
            <option value="$150/night">$150/night</option>
            <option value="$200/night">$200/night</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label>Rating:</label>
          <select name="rating" onChange={handleFilterChange}>
            <option value="">Select Rating</option>
            <option value="4">4 & Above</option>
            <option value="4.5">4.5 & Above</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Food Filter */}
        <div>
          <label>Food:</label>
          <select name="food" onChange={handleFilterChange}>
            <option value="">Select Food Option</option>
            <option value="Breakfast Included">Breakfast Included</option>
            <option value="Dinner Included">Dinner Included</option>
            <option value="No Meals Included">No Meals Included</option>
          </select>
        </div>

        {/* Features Filter */}
        <div>
          <label>Features:</label>
          <label>
            <input
              type="checkbox"
              value="Pool"
              onChange={handleFilterChange}
            /> Pool
          </label>
          <label>
            <input
              type="checkbox"
              value="Beach Access"
              onChange={handleFilterChange}
            /> Beach Access
          </label>
          <label>
            <input
              type="checkbox"
              value="Spa"
              onChange={handleFilterChange}
            /> Spa
          </label>
          <label>
            <input
              type="checkbox"
              value="Gym"
              onChange={handleFilterChange}
            /> Gym
          </label>
        </div>

        {/* Place Search */}
        <div>
          <label>Search by Place:</label>
          <input
            type="text"
            name="place"
            placeholder="Search Hotel"
            onChange={handleFilterChange}
          />
        </div>

        <button onClick={filterHotels}>Apply Filters</button>
      </div>

      <div className="hotel-banner">
        <h2>Available Hotels</h2>

        {filteredHotels.slice(0, 10).map((hotel, index) => (
          <div key={index} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <div className="hotel-details">
              <h3>{hotel.name}</h3>
              <p>Price: {hotel.price}</p>
              <p>Rating: {hotel.rating} ⭐</p>
              <p>Food: {hotel.food}</p>
              <p><strong>Features:</strong> {hotel.features.join(', ')}</p>
              <p><strong>USP:</strong> {hotel.usp}</p>
              <p><strong>Contact:</strong> {hotel.contact}</p>
              <button className="book-btn">Book This Hotel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelSection;
