const User = require("../models/User");

exports.getReferredUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const referredUsers = await User.find({
      referredBy: user.referralCode,
    }).lean();
    res.json({ referredUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReferralStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const referralCount = await User.countDocuments({
      referredBy: user.referralCode,
    });
    res.json({ totalReferrals: referralCount });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReferralLink = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const referralLink = `https://yourdomain.com/register?referral=${user.referralCode}`;
    res.json({ referralLink });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
