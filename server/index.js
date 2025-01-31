const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const flightsRoutes = require('./routes/flightsRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the signup route

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'https://thegrandtravelfrontend.vercel.app', // Allow requests from this frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Routes
app.use('/api/flights', flightsRoutes); // Use the flights route
app.use("/api/auth", authRoutes); // Use the auth routes for authentication

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("Database connection error:", err));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});