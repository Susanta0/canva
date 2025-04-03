const express = require("express");
const designTipController = require("../controllers/designTipController");
const auth = require("../middlewares/middleware");
const router = express.Router();

// Get all design tips
router.get("/design-tips", auth, designTipController.getDesignTips);

// Get personalized design tips based on user's design history
router.get("/personalized-tips", auth, designTipController.getPersonalizedTips);

// Save/unsave a tip (toggle functionality)
router.post("/save-tip", auth, designTipController.saveTip);

// Get user's saved tips
router.get("/saved-tips", auth, designTipController.getSavedTips);

// Rate a design tip
router.post("/rate-tip", auth, designTipController.rateTip);

// Submit a new tip (from users)
router.post("/submit-tip", auth, designTipController.submitTip);

// Admin: Approve a tip
router.put("/approve-tip/:tip_id", auth, designTipController.approveTip);

module.exports = router;