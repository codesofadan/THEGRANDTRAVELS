const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
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

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => 'popup-image-' + Date.now(),
  },
});

const upload = multer({ storage });

// Multer storage setup for invoices
const invoiceStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'invoices',
    format: async (req, file) => 'pdf', // supports promises as well
    public_id: (req, file) => 'invoice-' + Date.now(),
  },
});

const uploadInvoice = multer({ storage: invoiceStorage });

// API to upload image
app.post("/api/upload-popup", upload.single("popupImage"), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

// API to fetch latest popup image
app.get("/api/get-popup", (req, res) => {
  res.json({ imageUrl: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1/uploads/popup-image.jpg` });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.send('Server is running');
});

// API to upload invoice
app.post("/api/upload-invoice", uploadInvoice.single("invoice"), (req, res) => {
  res.json({ invoiceUrl: req.file.path });
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