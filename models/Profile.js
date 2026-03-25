const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    full_name: String,
    age: Number,
    gender: String,
    blood_type: String,
    height: Number,
    weight: Number,
    medical_conditions: [String],
    allergies: [String],
    avatar_url: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", profileSchema);
