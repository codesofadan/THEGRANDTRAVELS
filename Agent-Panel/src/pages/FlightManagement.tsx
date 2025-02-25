import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createFlight, fetchFlights, Flight } from '../api';

const FlightManagement = () => {
  const [formData, setFormData] = useState<Flight>({
    id: '',
    airline: '',
    departure: '',
    arrival: '',
    duration: '',
    price: 0,
    departure_time: '',
    arrival_time: '',
    status: '',
    logo: null,
    flight_number: '',
    departure_airport: '',
    arrival_airport: '',
  });
  const [flights, setFlights] = useState<Flight[]>([]);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file: File = e.target.files[0];
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createFlight({ ...formData, price: Number(formData.price) });
      setResponseMessage('Flight added successfully!');
      setFormData({
        id: '',
        airline: '',
        departure: '',
        arrival: '',
        duration: '',
        price: 0,
        departure_time: '',
        arrival_time: '',
        status: '',
        logo: null,
        flight_number: '',
        departure_airport: '',
        arrival_airport: '',
      });
      loadFlights();
    } catch (error) {
      setResponseMessage('An error occurred, please try again.');
    }
  };

  const loadFlights = async () => {
    try {
      const data = await fetchFlights();
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  useEffect(() => {
    loadFlights();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Flight Management</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="airline"
          placeholder="Airline Name"
          value={formData.airline}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="text"
          name="flight_number"
          placeholder="Flight Number"
          value={formData.flight_number}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="text"
          name="departure_airport"
          placeholder="Departure Airport"
          value={formData.departure_airport}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="text"
          name="arrival_airport"
          placeholder="Arrival Airport"
          value={formData.arrival_airport}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="datetime-local"
          name="departure_time"
          placeholder="Departure Time"
          value={formData.departure_time}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="datetime-local"
          name="arrival_time"
          placeholder="Arrival Time"
          value={formData.arrival_time}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="file"
          name="logo"
          onChange={handleFileChange}
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'goldenrod', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Flight
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      <h2>All Flights</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Flight Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Airline</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Departure</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Destination</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Departure Time</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Arrival Time</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Duration</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Logo</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.flight_number}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.airline}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.departure_airport}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.arrival_airport}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(flight.departure_time).toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(flight.arrival_time).toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.duration}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{typeof flight.price === 'number' ? `$${flight.price.toFixed(2)}` : 'N/A'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {flight.logo && <img src={URL.createObjectURL(flight.logo)} alt="Airline Logo" width="50" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightManagement;