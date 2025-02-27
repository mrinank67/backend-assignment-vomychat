const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const csurf = require("csurf");
const app = require("./app");

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(helmet());

// Enable CSRF Protection (after `cookieParser`)
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// CSRF Token Route (Set CSRF token in cookies)
app.get("/api/csrf-token", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken(), {
    httpOnly: false,
    sameSite: "Strict",
  });
  res.json({ message: "CSRF token set in cookie" });
});

// Apply CSRF Middleware AFTER Token Endpoint, Before All Other Routes
app.use((req, res, next) => {
  if (!req.csrfToken) {
    return res.status(500).json({ message: "CSRF middleware not applied" });
  }
  next();
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const referralRoutes = require("./routes/referralRoutes");
const connectDB = require("./config/db");

app.use("/api/auth", authRoutes);
app.use("/api", passwordRoutes);
app.use("/api/referrals", referralRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
