const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // Adjust the path to your Express app
const User = require("../models/User");
const Referral = require("../models/Referral");

// Test user registration
describe("User Registration", () => {
  it("should register a user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("referralCode");
  });

  it("should not allow duplicate emails", async () => {
    await request(app).post("/api/auth/register").send({
      username: "testuser2",
      email: "test@example.com", // Same email
      password: "password123",
    });

    const res = await request(app).post("/api/auth/register").send({
      username: "testuser3",
      email: "test@example.com", // Duplicate email
      password: "password123",
    });

    console.log("Response:", res.body);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email already in use");
  });

  it("should validate email format", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "invaliduser",
      email: "invalidemail",
      password: "password123",
    });

    console.log("Response:", res.body);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email format");
  });
});

// Test login functionality
describe("User Login", () => {
  it("should log in successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    console.log("Response:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  it("should reject incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    console.log("Response:", res.body);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
  });
});

// Test referral system
describe("Referral System", () => {
  let referralCode;

  let testUser;

  // Create a test user before running tests
  beforeEach(async () => {
    await User.deleteMany(); // Clear database before each test

    testUser = await User.create({
      username: "testuser",
      email: "test@example.com",
      password_hash: "hashedpassword123",
      referral_code: "REF123",
    });
  });

  it("should register a user using a referral code", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "password123",
      referralCode,
    });

    console.log("Response:", res.body);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("referralCode");

    // Check referral record
    const referral = await Referral.findOne({ referred_user_id: res.body._id });
    expect(referral).not.toBeNull();
    expect(referral.status).toBe("pending");
  });

  it("should reject invalid referral codes", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "invalidref",
      email: "invalidref@example.com",
      password: "password123",
      referralCode: "invalidCode123",
    });

    console.log("Response:", res.body);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid referral code");
  });

  it("should prevent users from referring themselves", async () => {
    const user = await User.findOne({ email: "newuser@example.com" });

    const res = await request(app).post("/api/auth/register").send({
      username: "selfref",
      email: "selfref@example.com",
      password: "password123",
      referralCode: user.referral_code,
    });

    console.log("Response:", res.body);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("You cannot refer yourself");
  });

  it("should update referral status on login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "newuser@example.com",
      password: "password123",
    });

    console.log("Response:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");

    const referral = await Referral.findOne({ referred_user_id: res.body._id });
    expect(referral.status).toBe("successful");
  });
});
