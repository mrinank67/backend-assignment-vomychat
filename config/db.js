const mongoose = require("mongoose");

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = db.connections[0].readyState;
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
