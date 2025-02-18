import { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://trevel-backend.vercel.app/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  interface Booking {
    _id: string;
    customerName: string;
    customerEmail: string;
    phoneNumber: string;
    bookingDate: string;
    status: string;
    notes: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<Booking>('https://trevel-backend.vercel.app/api/bookings', {
        customerName,
        customerEmail,
        phoneNumber,
        bookingDate,
        status,
        notes,
      });
      setBookings((prevBookings) => [...prevBookings, response.data]);
      setCustomerName('');
      setCustomerEmail('');
      setPhoneNumber('');
      setBookingDate('');
      setStatus('Pending');
      setNotes('');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  interface Booking {
    _id: string;
    customerName: string;
    customerEmail: string;
    phoneNumber: string;
    bookingDate: string;
    status: string;
    notes: string;
  }

  const handleDelete = async (bookingId: string) => {
    try {
      await axios.delete(`https://trevel-backend.vercel.app/api/bookings/${bookingId}`);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Booking Management</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h2>Create Booking</h2>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="email"
          placeholder="Customer Email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="date"
          placeholder="Booking Date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Canceled">Canceled</option>
          <option value="Rescheduled">Rescheduled</option>
        </select>
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Confirm Booking
        </button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#000' }}>Customer Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#000' }}>Customer Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#000' }}>Phone Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#000' }}>Booking Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#000' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#000' }}>Notes</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#000' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} style={{ backgroundColor: booking._id % 2 === 0 ? '#fff' : '#000' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.customerName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.customerEmail}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.phoneNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.notes}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleDelete(booking._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsManagement;