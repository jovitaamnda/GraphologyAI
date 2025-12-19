// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
