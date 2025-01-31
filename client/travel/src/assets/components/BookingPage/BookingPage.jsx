import React, { useState } from 'react';
import emailjs from 'emailjs-com';
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('service_smzo6up', 'template_ynjmnnn', formData, '2AP-WeNe8vgunTEcH')
      .then((result) => {
        console.log(result.text);
        alert('Details submitted successfully!');
      }, (error) => {
        console.log(error.text);
        alert('An error occurred, please try again.');
      });
  };

  const renderContactSection = () => {
    switch (bookingType) {
      case 'flights':
        return (
          <div className="contact-details">
            <h3>Flight Booking Details</h3>
            <label>Departure Date:</label>
            <input type="date" name="departureDate" onChange={handleInputChange} />
            <label>Return Date:</label>
            <input type="date" name="returnDate" onChange={handleInputChange} />
            <label>Destination:</label>
            <input type="text" name="destination" placeholder="Enter destination" onChange={handleInputChange} />
            <label>Departure From:</label>
            <input type="text" name="departureFrom" placeholder="Enter departure location" onChange={handleInputChange} />
            <label>Passengers:</label>
            <input type="number" name="passengers" min="1" onChange={handleInputChange} />
            <label>Class:</label>
            <select name="class" onChange={handleInputChange}>
              <option>Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
            <label>18+:</label>
            <select name="isAdult" onChange={handleInputChange}>
              <option>Yes</option>
              <option>No</option>
            </select>
            <label>Preferred Airline:</label>
            <input type="text" name="preferredAirline" placeholder="Enter airline" onChange={handleInputChange} />
          </div>
        );
      case 'hotels':
        return (
          <div className="contact-details">
            <h3>Hotel Booking Details</h3>
            <label>Check-in Date:</label>
            <input type="date" name="checkInDate" onChange={handleInputChange} />
            <label>Check-out Date:</label>
            <input type="date" name="checkOutDate" onChange={handleInputChange} />
            <label>Location:</label>
            <input type="text" name="location" placeholder="Enter location" onChange={handleInputChange} />
            <label>Guests:</label>
            <input type="number" name="guests" min="1" onChange={handleInputChange} />
            <label>Room Type:</label>
            <select name="roomType" onChange={handleInputChange}>
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
            <input type="text" name="packageType" placeholder="Enter package type" onChange={handleInputChange} />
            <label>Travel Dates:</label>
            <input type="date" name="travelDates" onChange={handleInputChange} />
            <label>Destination:</label>
            <input type="text" name="destination" placeholder="Enter destination" onChange={handleInputChange} />
            <label>Number of Travelers:</label>
            <input type="number" name="numberOfTravelers" min="1" onChange={handleInputChange} />
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
      <div className="caution-note">
        <span>⚠</span>
        You will be contacted by our team within 12 hours.
      </div>
    </div>
  );
};

export default BookingPage;