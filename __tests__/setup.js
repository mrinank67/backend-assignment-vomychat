const mongoose = require("mongoose");
const connectDB = require("../config/db"); // Import the central DB connection

beforeAll(async () => {
  await connectDB(); // Ensure the database is connected before tests start
});

afterAll(async () => {
  await mongoose.connection.close(); // Close the connection after tests finish
});
