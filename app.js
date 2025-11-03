const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Function to connect to MongoDB first, then start the server
const startServer = async () => {
  try {
    await mongoose.connect("mongodb+srv://hammadshafiq91_db_user:GRVsNDyznbxG8cKE@cluster0.zfngklf.mongodb.net/jobDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });

    console.log("✅ MongoDB connected successfully");

    // Routes
    app.use("/api/jobs", jobRoutes);

    // ✅ Default route — serve job.html as homepage
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "job.html"));
    });

    // Start server *after* successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop the app if connection fails
  }
};

startServer();
