import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";
import { loadSeedData } from "./services/dataService.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Load seed data on startup
loadSeedData();

// API routes
app.use("/api", apiRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Backend API Server",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      landing: "/api/landing",
      products: "/api/products",
      productDetail: "/api/products/:id",
      contact: "POST /api/contact",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Endpoint not found",
    },
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log("");
  console.log("═══════════════════════════════════════════");
  console.log("  Backend Server Started");
  console.log("═══════════════════════════════════════════");
  console.log(`  ➜ Local:   http://localhost:${PORT}`);
  console.log(`  ➜ Env:     ${process.env.NODE_ENV || "development"}`);
  console.log("═══════════════════════════════════════════");
  console.log("");
});
