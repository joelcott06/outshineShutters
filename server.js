const express = require("express");
const path = require("path");
const RateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

// Serve all files in project directory
app.use(express.static(path.join(__dirname)));

// Optional fallback to index.html for SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
