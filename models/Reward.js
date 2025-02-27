const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referral_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Referral",
    required: true,
  },
  reward_type: { type: String, required: true }, // e.g., "discount", "cashback"
  status: { type: String, enum: ["pending", "claimed"], default: "pending" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reward", RewardSchema);
