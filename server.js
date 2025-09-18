const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to force HTTPS
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https" && process.env.NODE_ENV === "production") {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
