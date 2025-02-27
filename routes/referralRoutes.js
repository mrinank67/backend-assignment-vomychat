const express = require("express");
const {
  getReferredUsers,
  getReferralStats,
  getReferralLink,
} = require("../controllers/referralController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/referred-users", authMiddleware, getReferredUsers);
router.get("/referral-stats", authMiddleware, getReferralStats);
router.get("/referral-link", authMiddleware, getReferralLink);

module.exports = router;
