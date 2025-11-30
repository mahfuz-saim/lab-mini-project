import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store
let data = {
  landing: {},
  products: [],
  contacts: [],
};

/**
 * Load seed data from JSON file
 */
export function loadSeedData() {
  try {
    const seedPath = path.join(__dirname, "../data/seed.json");
    const seedData = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

    data.landing = seedData.landing;
    data.products = seedData.products;

    console.log(`✓ Loaded ${data.products.length} products from seed data`);
  } catch (error) {
    console.error("Error loading seed data:", error.message);
  }
}

/**
 * Get all data (for debugging)
 */
export function getAllData() {
  return data;
}

/**
 * Get landing page data
 */
export function getLandingData() {
  return data.landing;
}

/**
 * Get all products with optional filters
 */
export function getProducts(filters = {}) {
  let products = [...data.products];

  // Filter by featured
  if (filters.featured !== undefined) {
    const isFeatured = filters.featured === "true" || filters.featured === true;
    products = products.filter((p) => p.featured === isFeatured);
  }

  // Filter by search query
  if (filters.q) {
    const query = filters.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Limit results
  if (filters.limit) {
    const limit = parseInt(filters.limit);
    products = products.slice(0, limit);
  }

  return products;
}

/**
 * Get product by ID
 */
export function getProductById(id) {
  const productId = parseInt(id);
  return data.products.find((p) => p.id === productId);
}

/**
 * Save contact form submission
 */
export function saveContact(contactData) {
  const contact = {
    id: data.contacts.length + 1,
    ...contactData,
    timestamp: new Date().toISOString(),
    status: "received",
  };

  data.contacts.push(contact);
  return contact;
}

/**
 * Get all contacts (for admin/debugging)
 */
export function getAllContacts() {
  return data.contacts;
}
