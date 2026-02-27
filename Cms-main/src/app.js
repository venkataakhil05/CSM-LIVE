const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

// 🔐 Security headers
app.use(helmet());

// 🌍 CORS
app.use(cors());

// 📝 Logger
app.use(morgan("dev"));

// 📦 Body parser
app.use(express.json({ limit: "10mb" }));

// 🚫 NoSQL injection protection
// express-mongo-sanitize tries to reassign req.query, which is read-only in Express 5.
// Sanitize in-place to avoid reassigning req.query.
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  if (req.query) mongoSanitize.sanitize(req.query);
  if (req.headers) mongoSanitize.sanitize(req.headers);
  next();
});

// ⏱ Rate limiter (DEFINE FIRST)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit each IP
  message: "Too many requests, please try again later.",
});

// Apply limiter to API routes
app.use("/api", limiter);

// Health route
app.get("/", (req, res) => res.send("CMS API Running"));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/artifacts", require("./routes/artifact.routes"));

module.exports = app;
