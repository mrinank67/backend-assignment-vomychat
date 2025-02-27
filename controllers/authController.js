const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passwordstrength = require("check-password-strength");
const Referral = require("../models/Referral");

exports.register = async (req, res) => {
  try {
    const { username, email, password, referralCode } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Generate a unique referral code for the new user
    const newReferralCode = Math.random().toString(36).substring(2, 8);

    // Validate referral code
    let referrer = null;
    if (referralCode) {
      referrer = await User.findOne({ referralCode });
      if (!referrer)
        return res.status(400).json({ message: "Invalid referral code" });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      referralCode: newReferralCode,
      referred_by: referrer ? referrer._id : null,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      referralCode: newReferralCode,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await require("bcryptjs").compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    await Referral.updateOne(
      { referred_user_id: user._id, status: "pending" },
      { $set: { status: "successful" } }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Store token in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    // Check if req.csrfToken exists before calling it
    if (!req.csrfToken) {
      return res
        .status(500)
        .json({ message: "CSRF middleware is not applied" });
    }

    // Generate CSRF token and store it in cookies
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken, {
      httpOnly: false,
      sameSite: "Strict",
    });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("XSRF-TOKEN"); // Remove CSRF token
  res.json({ message: "Logged out successfully" });
};
