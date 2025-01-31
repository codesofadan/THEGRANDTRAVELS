const Flight = require('../models/Flight'); // Assuming you have a Flight model

// Get flight details
const getFlightDetails = async (req, res) => {
  try {
    const { airline, departureAirport, arrivalAirport, departureDate, arrivalDate } = req.query;
    let query = {};

    if (airline) {
      query['airline.name'] = { $regex: airline, $options: 'i' };
    }
    if (departureAirport) {
      query['departure.iata'] = { $regex: departureAirport, $options: 'i' };
    }
    if (arrivalAirport) {
      query['arrival.iata'] = { $regex: arrivalAirport, $options: 'i' };
    }
    if (departureDate) {
      query['departure.scheduled'] = { $gte: new Date(departureDate), $lt: new Date(new Date(departureDate).setDate(new Date(departureDate).getDate() + 1)) };
    }
    if (arrivalDate) {
      query['arrival.scheduled'] = { $gte: new Date(arrivalDate), $lt: new Date(new Date(arrivalDate).setDate(new Date(arrivalDate).getDate() + 1)) };
    }

    const flights = await Flight.find(query).limit(100); // Adjust the query as needed
    res.json({ data: flights });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching flight details' });
  }
};

module.exports = {
  getFlightDetails,
};