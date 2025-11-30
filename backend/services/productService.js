import ProductBuilder from "../lib/ProductBuilder.js";
import {
  enhanceProduct,
  priceWithTaxDecorator,
  stockStatusDecorator,
} from "../lib/productDecorators.js";
import * as dataService from "./dataService.js";

/**
 * Get all products with Builder pattern and optional Decorators
 */
export function getProducts(filters = {}) {
  // Get raw products from data service
  const rawProducts = dataService.getProducts(filters);

  // Use Builder pattern to construct product DTOs
  const products = rawProducts.map((raw) => {
    // Build the product using ProductBuilder
    let product = ProductBuilder.fromData(raw);

    // Apply Decorator pattern if tax flag is present
    if (filters.tax === "true" || filters.tax === true) {
      product = priceWithTaxDecorator(product, 0.15); // 15% tax
    }

    // Always add stock status decorator
    product = stockStatusDecorator(product);

    return product;
  });

  return products;
}

/**
 * Get product by ID with Builder pattern and Decorators
 */
export function getProductById(id, options = {}) {
  const rawProduct = dataService.getProductById(id);

  if (!rawProduct) {
    return null;
  }

  // Use Builder pattern to construct the product
  let product = new ProductBuilder()
    .withBaseInfo({
      id: rawProduct.id,
      name: rawProduct.name,
      description: rawProduct.description,
      price: rawProduct.price,
      category: rawProduct.category,
    })
    .withVariants(rawProduct.variants)
    .withMetadata({
      stock: rawProduct.stock,
      featured: rawProduct.featured,
      imageUrl: rawProduct.imageUrl,
      rating: rawProduct.rating,
    })
    .withTags(rawProduct.tags)
    .build();

  // Apply decorators using the enhanceProduct helper
  product = enhanceProduct(product, {
    includeTax: options.tax === "true",
    includeStockStatus: true,
    includePromo: rawProduct.featured,
  });

  return product;
}

/**
 * Get landing page data
 */
export function getLandingData() {
  return dataService.getLandingData();
}

/**
 * Validate and save contact form
 */
export function saveContact(contactData) {
  // Validation
  const errors = validateContact(contactData);

  if (errors.length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // Save contact
  const saved = dataService.saveContact(contactData);

  return {
    success: true,
    data: {
      id: saved.id,
      status: saved.status,
    },
  };
}

/**
 * Validate contact form data
 */
function validateContact(data) {
  const errors = [];

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: "name",
      message: "Name must be at least 2 characters long",
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({
      field: "email",
      message: "Please provide a valid email address",
    });
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.push({
      field: "message",
      message: "Message must be at least 10 characters long",
    });
  }

  if (data.message && data.message.length > 1000) {
    errors.push({
      field: "message",
      message: "Message must not exceed 1000 characters",
    });
  }

  return errors;
}
