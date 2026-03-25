const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptoms: [String],
    severity: {
      type: String,
      enum: ["mild", "moderate", "severe"],
      default: "moderate",
    },
    notes: String,
    predicted_diseases: mongoose.Schema.Types.Mixed,
    recommendations: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

module.exports = mongoose.model("SymptomCheck", schema);
