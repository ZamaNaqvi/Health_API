const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");

const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctor");
const profileRoutes = require("./routes/profile");
const symptomRoutes = require("./routes/symptomcheck");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/symptom-checks", symptomRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 10000;

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
