import express from "express";
import * as productService from "../services/productService.js";

const router = express.Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/landing
 * Get landing page content
 */
router.get("/landing", (req, res) => {
  try {
    const data = productService.getLandingData();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch landing data",
      },
    });
  }
});

/**
 * GET /api/products
 * Get all products with optional filters
 * Query params: limit, featured, q (search), tax
 */
router.get("/products", (req, res) => {
  try {
    const filters = {
      limit: req.query.limit,
      featured: req.query.featured,
      q: req.query.q,
      tax: req.query.tax,
    };

    const products = productService.getProducts(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch products",
      },
    });
  }
});

/**
 * GET /api/products/:id
 * Get product by ID
 */
router.get("/products/:id", (req, res) => {
  try {
    const product = productService.getProductById(req.params.id, {
      tax: req.query.tax,
    });

    if (!product) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "Product not found",
        },
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch product",
      },
    });
  }
});

/**
 * POST /api/contact
 * Submit contact form
 * Body: { name, email, message, source }
 */
router.post("/contact", (req, res) => {
  try {
    const { name, email, message, source } = req.body;

    // Validate request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: {
          code: "INVALID_INPUT",
          message: "Request body is required",
        },
      });
    }

    // Save contact with validation
    const result = productService.saveContact({
      name,
      email,
      message,
      source: source || "website",
    });

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid input",
          details: result.errors,
        },
      });
    }

    // Return success response
    res.status(201).json(result.data);
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to process contact form",
      },
    });
  }
});

export default router;
