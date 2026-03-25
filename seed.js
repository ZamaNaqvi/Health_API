// Run: node seed.js — to populate doctors collection with Indian doctors
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");
const config = require("./config");

const doctors = [
  { name: "Dr. Arvind Sharma", specialization: "Cardiologist", hospital: "AIIMS Delhi", location: "New Delhi", experience: 18, rating: 4.9, contact: "+91 98100 12345" },
  { name: "Dr. Priya Nair", specialization: "Dermatologist", hospital: "Apollo Hospital", location: "Chennai", experience: 12, rating: 4.7, contact: "+91 98410 23456" },
  { name: "Dr. Rajesh Gupta", specialization: "Neurologist", hospital: "Fortis Hospital", location: "Mumbai", experience: 20, rating: 4.8, contact: "+91 98200 34567" },
  { name: "Dr. Sneha Reddy", specialization: "Pediatrician", hospital: "Rainbow Children's Hospital", location: "Hyderabad", experience: 10, rating: 4.6, contact: "+91 99490 45678" },
  { name: "Dr. Vikram Singh", specialization: "Orthopedic Surgeon", hospital: "Medanta Hospital", location: "Gurugram", experience: 15, rating: 4.8, contact: "+91 98110 56789" },
  { name: "Dr. Anita Desai", specialization: "Gynecologist", hospital: "Manipal Hospital", location: "Bangalore", experience: 14, rating: 4.7, contact: "+91 98450 67890" },
  { name: "Dr. Sheeban khan", specialization: "General Physician", hospital: "Narayana Health", location: "Kolkata", experience: 22, rating: 4.5, contact: "+91 98300 78901" },
  { name: "Dr. Kavita Joshi", specialization: "Psychiatrist", hospital: "NIMHANS", location: "Bangalore", experience: 16, rating: 4.8, contact: "+91 98860 89012" },
  { name: "Dr. Amit Patel", specialization: "Pulmonologist", hospital: "Max Hospital", location: "New Delhi", experience: 11, rating: 4.6, contact: "+91 98710 90123" },
  { name: "Dr. Deepa Iyer", specialization: "Endocrinologist", hospital: "Kokilaben Hospital", location: "Mumbai", experience: 13, rating: 4.7, contact: "+91 98670 01234" },
  { name: "Dr. Ramesh Kumar", specialization: "Gastroenterologist", hospital: "Sir Ganga Ram Hospital", location: "New Delhi", experience: 19, rating: 4.9, contact: "+91 98180 11223" },
  { name: "Dr. Meera Krishnan", specialization: "Ophthalmologist", hospital: "Sankara Nethralaya", location: "Chennai", experience: 17, rating: 4.8, contact: "+91 98840 22334" },
];

async function seed() {
  await mongoose.connect(config.MONGODB_URI);
  console.log("Connected to MongoDB");

  await Doctor.deleteMany({});
  console.log("Cleared existing doctors");

  await Doctor.insertMany(doctors);
  console.log(`✅ Seeded ${doctors.length} doctors`);

  await mongoose.disconnect();
  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
