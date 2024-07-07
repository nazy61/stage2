const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const apiRoutes = require("./routes/routes");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// all routes
app.use("/auth", apiRoutes.authRoutes);
app.use("/api", apiRoutes.userRoutes);
app.use("/api", apiRoutes.orgRoutes);

// Middleware for handling non-existent routes
app.use((req, res, next) => {
  res.status(404).send({
    status: false,
    message: `API Endpoint not found - ${req.path}`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
