const express = require("express");
const { body, validationResult } = require("express-validator");
const SymptomCheck = require("../models/SymptomCheck");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// GET /api/symptom-checks — list user's checks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const checks = await SymptomCheck.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json(checks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/symptom-checks/recent — last 5 checks
router.get("/recent", authMiddleware, async (req, res) => {
  try {
    const checks = await SymptomCheck.find({ user_id: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(checks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/symptom-checks — create new check
router.post(
  "/",
  authMiddleware,
  [body("symptoms").isArray({ min: 1 }).withMessage("At least one symptom required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    try {
      const { symptoms, severity, notes, predicted_diseases, recommendations } = req.body;

      const check = await SymptomCheck.create({
        user_id: req.user.id,
        symptoms,
        severity: severity || "moderate",
        notes: notes || null,
        predicted_diseases: predicted_diseases || null,
        recommendations: recommendations || null,
      });

      res.status(201).json(check);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// DELETE /api/symptom-checks/:id — delete a check
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const check = await SymptomCheck.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!check) return res.status(404).json({ error: "Check not found" });
    res.json({ message: "Symptom check deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
