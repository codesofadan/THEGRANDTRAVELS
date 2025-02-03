const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer'); // Add multer for file uploads
const flightsRoutes = require('./routes/flightsRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the signup route
const popupRoutes = require('./routes/popupRoutes'); // Import the popup routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://thegrandtravelfrontend.vercel.app'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Multer storage setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, "popup-image" + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// API to upload image
app.post("/upload-popup", upload.single("popupImage"), (req, res) => {
  res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// API to fetch latest popup image
app.get("/get-popup", (req, res) => {
  res.json({ imageUrl: `http://localhost:5000/uploads/popup-image.jpg` });
});

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
app.use("/api/popup", popupRoutes); // Use the popup routes

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