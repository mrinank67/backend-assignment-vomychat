const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  referrer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // User who referred
  referred_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // New user
  date_referred: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "successful"], default: "pending" },
});

module.exports = mongoose.model("Referral", ReferralSchema);
