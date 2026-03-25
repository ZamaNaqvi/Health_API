const express = require("express");
const { body, validationResult } = require("express-validator");
const Doctor = require("../models/Doctor");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// GET /api/doctors — list all doctors (public)
router.get("/", async (req, res) => {
  try {
    const { specialization, location, search } = req.query;
    const filter = {};

    if (specialization) filter.specialization = new RegExp(specialization, "i");
    if (location) filter.location = new RegExp(location, "i");
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { specialization: new RegExp(search, "i") },
        { hospital: new RegExp(search, "i") },
      ];
    }

    const doctors = await Doctor.find(filter).sort({ rating: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/doctors/:id — single doctor (public)
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/doctors — add doctor (authenticated)
router.post(
  "/",
  authMiddleware,
  [
    body("name").notEmpty(),
    body("specialization").notEmpty(),
    body("hospital").notEmpty(),
    body("location").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

    try {
      const doctor = await Doctor.create(req.body);
      res.status(201).json(doctor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// PUT /api/doctors/:id — update doctor (authenticated)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/doctors/:id — delete doctor (authenticated)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
