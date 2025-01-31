const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  flight_number: String,
  departure_airport: String,
  arrival_airport: String,
  departure_time: Date,
  arrival_time: Date,
  status: String,
  // Add other fields as needed
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;