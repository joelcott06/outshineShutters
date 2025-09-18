const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Trust proxy headers (needed if behind load balancer / reverse proxy)
app.enable("trust proxy");

// Middleware to force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && req.secure === false) {
    // Use relative redirect, not raw host header
    return res.redirect(301, "https://" + req.hostname + req.originalUrl);
  }
  next();
});

// Serve only from a dedicated public folder
app.use(express.static(path.join(__dirname, "public"), {
  dotfiles: "ignore", // prevent serving .env, .gitignore, etc.
  index: "index.html",
  maxAge: "1d" // optional: cache static assets
}));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
