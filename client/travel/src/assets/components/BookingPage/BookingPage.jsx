import React, { useState } from 'react';
import { createQuery } from '../../services/api'; // Import the createQuery function
import './BookingPage.css';

const BookingPage = () => {
  const [bookingType, setBookingType] = useState('flights');
  const [formData, setFormData] = useState({
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
            <input type="text" name="destination" placeholder="Enter destination" value={formData.destination} onChange={handleInputChange} />
            <label>Departure From:</label>
            <input type="text" name="departureFrom" placeholder="Enter departure location" value={formData.departureFrom} onChange={handleInputChange} />
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
            <input type="text" name="preferredAirline" placeholder="Enter airline" value={formData.preferredAirline} onChange={handleInputChange} />
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