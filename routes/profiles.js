const express = require("express");
const Profile = require("../models/Profile");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// GET /api/profiles/me — get current user's profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.user.id });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/profiles/me — update current user's profile
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const allowedFields = [
      "full_name", "age", "gender", "blood_type",
      "height", "weight", "medical_conditions", "allergies", "avatar_url",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const profile = await Profile.findOneAndUpdate(
      { user_id: req.user.id },
      updates,
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
