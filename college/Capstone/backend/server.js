// backend/index.js atau server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth"); // pastikan path-nya benar

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Konek ke MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected via Mongoose!"))
  .catch((err) => {
    console.error("MongoDB gagal connect:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Grapholyze Backend + MongoDB Atlas = JALAN!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend jalan di http://localhost:${PORT}`);
  console.log("Coba login: POST /api/auth/login → admin@gmail.com + admin123");
});
