const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose.connect("mongodb+srv://hammadshafiq91_db_user:GRVsNDyznbxG8cKE@cluster0.zfngklf.mongodb.net/jobDB")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/jobs", jobRoutes);

// ✅ Default route — serve job.html as homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "job.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
