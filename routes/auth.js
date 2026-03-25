const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Profile = require("../models/Profile");
const config = require("../config");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("full_name").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array()[0].msg });

      const { email, password, full_name } = req.body;

      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: "Email exists" });

      const user = await User.create({ email, password, full_name });

      await Profile.create({ user_id: user._id, full_name });

      const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ error: errors.array()[0].msg });

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const match = await user.comparePassword(password);
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
