const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

// Importing routes
const flightsRoutes = require("./routes/flightsRoutes");
const authRoutes = require("./routes/authRoutes");
const popupRoutes = require("./routes/popupRoutes");
const queryRoutes = require("./routes/queryRoutes");
const agentRoutes = require("./routes/agentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const calendarEventRoutes = require("./routes/calendarEventRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Database connection error:", err));

// Serve static files (if using Vercel, consider using external storage like S3)
app.use("/uploads", express.static("uploads"));
app.use("/invoices", express.static("invoices"));

// Multer storage setup for uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, "popup-image" + path.extname(file.originalname)),
});
const upload = multer({ storage });

const invoiceStorage = multer.diskStorage({
  destination: "invoices/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const uploadInvoice = multer({ storage: invoiceStorage });

// API routes
app.use("/api/flights", flightsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/popup", popupRoutes);
app.use("/api", queryRoutes);
app.use("/api", agentRoutes);
app.use("/api", bookingRoutes);
app.use("/api", calendarEventRoutes);
app.use("/api", invoiceRoutes);

// Upload endpoints
app.post("/api/upload-popup", upload.single("popupImage"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

app.post("/api/upload-invoice", uploadInvoice.single("invoice"), (req, res) => {
  res.json({ invoiceUrl: `/invoices/${req.file.filename}` });
});

// Health check
app.get("/api/health", (req, res) => {
  res.send("Server is running");
});

// Serve frontend (only for local, not required in Vercel)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../client/build", "index.html")));
}

// **🚀 IMPORTANT:** Vercel requires exporting the app, NOT using `app.listen()`
module.exports = app;
