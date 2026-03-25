const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    hospital: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, default: 0 },
    rating: { type: Number, default: 4 },
    contact: String,
    avatar_url: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Doctor", doctorSchema);
