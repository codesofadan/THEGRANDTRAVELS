const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const flightsRoutes = require('./routes/flightsRoutes');
const authRoutes = require('./routes/authRoutes');
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
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Remove Multer storage setup for popup images
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, "popup-image" + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// Remove Multer storage setup for invoices
// const invoiceStorage = multer.diskStorage({
//   destination: "invoices/",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const uploadInvoice = multer({ storage: invoiceStorage });

// Remove API to upload image
// app.post("/api/upload-popup", upload.single("popupImage"), (req, res) => {
//   res.json({ imageUrl: `https://thegrandtravelsbackend.vercel.app/uploads/${req.file.filename}` });
// });

// Remove API to fetch latest popup image
// app.get("/api/get-popup", (req, res) => {
//   res.json({ imageUrl: `https://thegrandtravelsbackend.vercel.app/uploads/popup-image.jpg` });
// });

app.get('/api/health', (req, res) => {
  res.send('Server is running');
});

// Remove API to upload invoice
// app.post("/api/upload-invoice", uploadInvoice.single("invoice"), (req, res) => {
//   res.json({ invoiceUrl: `https://thegrandtravelsbackend.vercel.app/invoices/${req.file.filename}` });
// });

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