import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import './FlightBookingPage.css';

const calculateFlightDuration = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return 'N/A';
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);
  const durationMs = arrival - departure;

  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

const FlightBookingsPage = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filters, setFilters] = useState({
    airline: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    arrivalDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFlights, setShowFlights] = useState(false);
  const [loading, setLoading] = useState(false);
  const flightsPerPage = 10;

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.aviationstack.com/v1/flights', {
        params: {
          access_key: '0d864873390e3b105267e8b1623ad5ef',
          limit: 100,
        },
      });
      const flightData = response.data.data || [];
      setFlights(flightData);
      setFilteredFlights(flightData);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filterFlights = () => {
    let filtered = flights;

    if (filters.airline) {
      filtered = filtered.filter((flight) =>
        flight.airline?.name?.toLowerCase().includes(filters.airline.toLowerCase())
      );
    }

    if (filters.departureAirport) {
      filtered = filtered.filter((flight) =>
        flight.departure?.airport?.toLowerCase().includes(filters.departureAirport.toLowerCase())
      );
    }

    if (filters.arrivalAirport) {
      filtered = filtered.filter((flight) =>
        flight.arrival?.airport?.toLowerCase().includes(filters.arrivalAirport.toLowerCase())
      );
    }

    if (filters.departureDate) {
      filtered = filtered.filter(
        (flight) =>
          new Date(flight.departure?.scheduled).toDateString() ===
          new Date(filters.departureDate).toDateString()
      );
    }

    if (filters.arrivalDate) {
      filtered = filtered.filter(
        (flight) =>
          new Date(flight.arrival?.scheduled).toDateString() ===
          new Date(filters.arrivalDate).toDateString()
      );
    }

    setFilteredFlights(filtered);
    setCurrentPage(1);
  };

  const handleShowFlights = () => {
    fetchFlights();
    setShowFlights(true);
  };

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flight-page">
      <div className={`filter-bar ${showFlights ? 'hidden' : ''}`}>
        <h3>Filter Flights:</h3>
        <div>
          <label>Airline:</label>
          <input
            type="text"
            name="airline"
            placeholder="Search Airline"
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Departure Airport:</label>
          <input
            type="text"
            name="departureAirport"
            placeholder="Search Departure Airport"
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Arrival Airport:</label>
          <input
            type="text"
            name="arrivalAirport"
            placeholder="Search Arrival Airport"
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Departure Date:</label>
          <input type="date" name="departureDate" onChange={handleFilterChange} />
        </div>
        <div>
          <label>Arrival Date:</label>
          <input type="date" name="arrivalDate" onChange={handleFilterChange} />
        </div>
        <button className="filter-button" onClick={filterFlights}>
          Apply Filters
        </button>
        <button className="filter-button" onClick={handleShowFlights}>
          Show All Flights
        </button>
      </div>

      <main className="tickets-section" style={{ display: showFlights ? 'block' : 'none' }}>
        {loading ? (
          <div className="loader-container">
            <ClipLoader size={50} color={"#003366"} loading={loading} />
          </div>
        ) : (
          <>
            <h1>Available Flights</h1>
            {currentFlights.map((flight) => (
              <FlightCard key={flight.flight?.iata || flight.flight?.number} flight={flight} calculateFlightDuration={calculateFlightDuration} />
            ))}
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredFlights.length / flightsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const FlightCard = ({ flight, calculateFlightDuration }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const departure = new Date(flight.departure?.scheduled);
      const timeLeft = departure - now;

      if (timeLeft <= 0) return 'Flight Departed';

      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      return `${hours}h ${minutes}m ${seconds}s`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [flight.departure?.scheduled]);

  const handleBookNow = () => {
    navigate('/bookings');
  };

  return (
    <div className="ticket-box">
      <div className="ticket-header">
        <img
          src={`https://logo.clearbit.com/${flight.airline?.name?.replace(/\s+/g, '').toLowerCase()}.com`}
          alt={flight.airline?.name || 'Airline Logo'}
          className="airline-logo"
        />
        <h2>{flight.airline?.name || 'N/A'}</h2>
        <div className="flight-timer-container">
          <div className="flight-timer">{timeLeft}</div>
          <div className="flight-timer-hover">Book flight quickly, you are running out of time!</div>
        </div>
      </div>
      <div className="ticket-body">
        <p className="flight-route">
          <i className="fas fa-plane-departure"></i>
          {flight.departure?.airport || 'N/A'} → {flight.arrival?.airport || 'N/A'}
        </p>
        <p className="flight-time">
          <i className="fas fa-clock"></i>
          Departure: {new Date(flight.departure?.scheduled).toLocaleString() || 'N/A'}
        </p>
        <p className="flight-time">
          <i className="fas fa-clock"></i>
          Arrival: {new Date(flight.arrival?.scheduled).toLocaleString() || 'N/A'}
        </p>
        <p className="flight-duration">
          <i className="fas fa-hourglass-half"></i>
          Duration: {calculateFlightDuration(flight.departure?.scheduled, flight.arrival?.scheduled)}
        </p>
        <div className="price-section">
          <div className="price-dropdown">
            <span><i className="fas fa-dollar-sign"></i> Price Options</span>
            <div className="price-dropdown-content">
              <p><i className="fas fa-suitcase-rolling"></i> With Heavy Baggage: $500</p>
              <p><i className="fas fa-suitcase"></i> Without Heavy Baggage: $450</p>
            </div>
          </div>
          <div className="book-dropdown">
            <button className="book-button" onClick={handleBookNow}>
              Book Now <i className="fas fa-caret-down"></i>
            </button>
            <div className="book-dropdown-content">
              <p><i className="fas fa-plane"></i> Economy Class</p>
              <p><i className="fas fa-plane"></i> Business Class</p>
              <p><i className="fas fa-plane"></i> First Class</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingsPage;