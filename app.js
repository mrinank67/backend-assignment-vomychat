require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to Database (only once)
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err); // Log the full error
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message, // Return full error message for debugging
  });
});

module.exports = app; // Export Express app without calling `listen()`
