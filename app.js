const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Root route (home page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "job.html"));
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Example route for About page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
