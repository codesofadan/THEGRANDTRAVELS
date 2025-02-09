const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const flightsRoutes = require('./routes/flightsRoutes');
const authRoutes = require('./routes/authRoutes');
const popupRoutes = require('./routes/popupRoutes');
const queryRoutes = require('./routes/queryRoutes');
const agentRoutes = require('./routes/agentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const calendarEventRoutes = require('./routes/calendarEventRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes'); // Import the invoice routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use("/invoices", express.static("invoices")); // Serve uploaded invoices

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://thegrandtravelfrontend.vercel.app', 'http://localhost:5177'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Multer storage setup for popup images
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, "popup-image" + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Multer storage setup for invoices
const invoiceStorage = multer.diskStorage({
  destination: "invoices/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadInvoice = multer({ storage: invoiceStorage });

// API to upload image
app.post("/upload-popup", upload.single("popupImage"), (req, res) => {
  res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// API to fetch latest popup image
app.get("/get-popup", (req, res) => {
  res.json({ imageUrl: `http://localhost:5000/uploads/popup-image.jpg` });
});

// API to upload invoice
app.post("/upload-invoice", uploadInvoice.single("invoice"), (req, res) => {
  res.json({ invoiceUrl: `http://localhost:5000/invoices/${req.file.filename}` });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Routes
app.use('/api/flights', flightsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/popup", popupRoutes);
app.use('/api', queryRoutes);
app.use('/api', agentRoutes);
app.use('/api', bookingRoutes);
app.use('/api', calendarEventRoutes);
app.use('/api', invoiceRoutes); // Use the invoice routes

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