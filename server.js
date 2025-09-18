const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;

app.enable("trust proxy");

// Security middleware
app.use(helmet());
app.disable("x-powered-by");

// Force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && !req.secure) {
    return res.redirect(301, "https://" + req.hostname + req.originalUrl);
  }
  next();
});

// Serve only from /public
app.use(express.static(path.join(__dirname, "public"), {
  dotfiles: "ignore",
  index: "index.html",
  maxAge: "1d"
}));

// Start server
app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Server running on port ${port}`);
  }
});
