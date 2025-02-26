import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { createQuery } from '../../services/api'; // Import the createQuery function
import './BookingPage.css';

const destinations = [
  // Major Cities in Pakistan, India, UK, USA, and Famous Tourist Spots
  'Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad', 'Sialkot', 'Rawalpindi', 'Hyderabad',
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
  'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Edinburgh', 'Bristol', 'Sheffield', 'Newcastle',
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Paris', 'Rome', 'Barcelona', 'Amsterdam', 'Venice', 'Dubai', 'Bangkok', 'Singapore', 'Tokyo', 'Hong Kong',
  // Additional 450 destinations
  ...Array(450).fill().map((_, i) => `Destination ${i + 51}`)
];

const airlines = [
  // Major Airlines
  'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Cathay Pacific', 'Turkish Airlines', 'Lufthansa', 'British Airways',
  'Air France', 'KLM', 'Swiss International', 'Qantas', 'Japan Airlines', 'ANA', 'Thai Airways', 'Korean Air',
  'Etihad Airways', 'Saudi Arabian Airlines', 'Oman Air', 'Pakistan International Airlines', 'IndiGo', 'Air India',
  'China Southern Airlines', 'China Eastern Airlines', 'Eva Air', 'Philippine Airlines', 'Vietnam Airlines', 'Garuda Indonesia',
  'Malaysia Airlines', 'SriLankan Airlines', 'Asiana Airlines',
  // Budget & Regional Airlines
  'EasyJet', 'Ryanair', 'Wizz Air', 'Vueling', 'Norwegian Air', 'Pegasus Airlines', 'Air Arabia', 'Flydubai', 'Go First',
  'Scoot', 'Jetstar', 'Batik Air', 'Lion Air', 'AirAsia', 'Spring Airlines', 'Juneyao Airlines', 'SpiceJet', 'Air Astana',
  'Uzbekistan Airways', 'Bangkok Airways', 'Myanmar Airways', 'VietJet Air', 'Himalaya Airlines', 'Nepal Airlines', 'Mahan Air',
  // Additional 130 airlines
  ...Array(130).fill().map((_, i) => `Airline ${i + 71}`)
];

const BookingPage = () => {
  const [bookingType, setBookingType] = useState('flights');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    departureDate: '',
    returnDate: '',
    destination: '',
    departureFrom: '',
    passengers: '',
    class: 'Economy',
    isAdult: 'Yes',
    preferredAirline: '',
    checkInDate: '',
    checkOutDate: '',
    location: '',
    guests: '',
    roomType: 'Single',
    packageType: '',
    travelDates: '',
    numberOfTravelers: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const query = {
        name: formData.name || 'Booking Query',
        email: formData.email || 'no-email@example.com',
        message: JSON.stringify(formData),
      };
      await createQuery(query);
      setResponseMessage('Details submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        departureDate: '',
        returnDate: '',
        destination: '',
        departureFrom: '',
        passengers: '',
        class: 'Economy',
        isAdult: 'Yes',
        preferredAirline: '',
        checkInDate: '',
        checkOutDate: '',
        location: '',
        guests: '',
        roomType: 'Single',
        packageType: '',
        travelDates: '',
        numberOfTravelers: '',
      });
    } catch (error) {
      setResponseMessage('An error occurred, please try again.');
    }
  };

  const getSuggestions = (value, list) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : list.filter(item =>
      item.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onSuggestionsFetchRequested = ({ value, reason }) => {
    if (reason === 'input-changed' || reason === 'input-focused') {
      setSuggestions(getSuggestions(value, destinations));
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    const name = event.target.name;
    setFormData((prev) => ({ ...prev, [name]: suggestion }));
  };

  const renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  );

  const inputProps = (name, placeholder, value) => ({
    placeholder,
    value,
    name,
    onChange: handleInputChange
  });

  const renderContactSection = () => {
    switch (bookingType) {
      case 'flights':
        return (
          <div className="contact-details">
            <h3>Flight Booking Details</h3>
            <label>Departure Date:</label>
            <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} />
            <label>Return Date:</label>
            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} />
            <label>Destination:</label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={suggestion => suggestion}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps('destination', 'Enter destination', formData.destination)}
            />
            <label>Departure From:</label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={suggestion => suggestion}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps('departureFrom', 'Enter departure location', formData.departureFrom)}
            />
            <label>Passengers:</label>
            <input type="number" name="passengers" min="1" value={formData.passengers} onChange={handleInputChange} />
            <label>Class:</label>
            <select name="class" value={formData.class} onChange={handleInputChange}>
              <option>Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
            <label>18+:</label>
            <select name="isAdult" value={formData.isAdult} onChange={handleInputChange}>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Preferred Airline:</label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value, airlines))}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={suggestion => suggestion}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps('preferredAirline', 'Enter airline', formData.preferredAirline)}
            />
          </div>
        );
      case 'hotels':
        return (
          <div className="contact-details">
            <h3>Hotel Booking Details</h3>
            <label>Check-in Date:</label>
            <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleInputChange} />
            <label>Check-out Date:</label>
            <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleInputChange} />
            <label>Location:</label>
            <input type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleInputChange} />
            <label>Guests:</label>
            <input type="number" name="guests" min="1" value={formData.guests} onChange={handleInputChange} />
            <label>Room Type:</label>
            <select name="roomType" value={formData.roomType} onChange={handleInputChange}>
              <option>Single</option>
              <option>Double</option>
              <option>Suite</option>
            </select>
          </div>
        );
      case 'flights&hotels':
        return (
          <div className="contact-details">
            <h3>Flights & Hotels Booking Details</h3>
            <p>Enter flight details:</p>
            {renderContactSection('flights')}
            <p>Enter hotel details:</p>
            {renderContactSection('hotels')}
          </div>
        );
      case 'packages':
        return (
          <div className="contact-details">
            <h3>Package Booking Details</h3>
            <label>Package Type:</label>
            <input type="text" name="packageType" placeholder="Enter package type" value={formData.packageType} onChange={handleInputChange} />
            <label>Travel Dates:</label>
            <input type="date" name="travelDates" value={formData.travelDates} onChange={handleInputChange} />
            <label>Destination:</label>
            <input type="text" name="destination" placeholder="Enter destination" value={formData.destination} onChange={handleInputChange} />
            <label>Number of Travelers:</label>
            <input type="number" name="numberOfTravelers" min="1" value={formData.numberOfTravelers} onChange={handleInputChange} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="booking-page">
      <h1 className="page-title">Confirm Your Booking</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Enter Details for Booking</h2>
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
          >
            <option value="flights">Flights</option>
            <option value="hotels">Hotels</option>
            <option value="flights&hotels">Flights & Hotels</option>
            <option value="packages">Packages</option>
          </select>
        </div>
        <div className="contact-details">
          <label>Name:</label>
          <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} />
          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
          <label>Phone:</label>
          <input type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} />
          <label>Address:</label>
          <input type="text" name="address" placeholder="Enter your address" value={formData.address} onChange={handleInputChange} />
        </div>
        {renderContactSection()}
        <button type="submit" className="submit-button">Submit Details</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
      <div className="caution-note">
        <span>⚠</span>
        You will be contacted by our team within 12 hours.
      </div>
    </div>
  );
};

export default BookingPage;