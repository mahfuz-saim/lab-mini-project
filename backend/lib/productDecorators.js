/**
 * Product Decorators - Implements the Decorator Design Pattern
 *
 * PURPOSE:
 * The Decorator pattern allows behavior to be added to individual objects
 * dynamically without affecting other objects of the same class.
 * Here, we enhance product objects with additional computed fields.
 *
 * WHEN TO USE:
 * - When you need to add responsibilities to objects dynamically
 * - When extending functionality through inheritance is impractical
 * - When you want to add features that can be combined in various ways
 * - When you need to keep the original object unchanged (immutability)
 *
 * BENEFITS:
 * - More flexible than static inheritance
 * - Decorators can be stacked/chained for multiple enhancements
 * - Follows Open/Closed Principle (open for extension, closed for modification)
 * - Preserves immutability by returning new objects
 *
 * KEY PRINCIPLE:
 * Each decorator function takes a product and returns a NEW product object
 * with additional fields, leaving the original object unchanged.
 */

/**
 * DECORATOR 1: Price with Tax Calculator
 * Adds a computed 'priceWithTax' field to the product
 *
 * @param {Object} product - The original product object
 * @param {number} taxRate - Tax rate as a decimal (e.g., 0.15 for 15%)
 * @returns {Object} - New product object with priceWithTax field
 */
export function priceWithTaxDecorator(product, taxRate = 0.15) {
  // Create a new object by spreading the original product
  // This preserves immutability - the original product is NOT modified
  return {
    ...product,
    // Add the computed field
    priceWithTax: parseFloat((product.price * (1 + taxRate)).toFixed(2)),
    taxRate: taxRate,
  };
}

/**
 * DECORATOR 2: Promotional Label Decorator
 * Adds a promotional label/badge to the product
 *
 * @param {Object} product - The original product object
 * @param {string} promoLabel - Promotional text (e.g., "Sale!", "New Arrival")
 * @returns {Object} - New product object with promoLabel field
 */
export function promoLabelDecorator(product, promoLabel = "Special Offer") {
  // Again, spread the original and add new field
  return {
    ...product,
    promoLabel: promoLabel,
  };
}

/**
 * DECORATOR 3: Discount Decorator
 * Applies a discount and adds discounted price
 *
 * @param {Object} product - The original product object
 * @param {number} discountPercent - Discount percentage (e.g., 20 for 20% off)
 * @returns {Object} - New product object with discount fields
 */
export function discountDecorator(product, discountPercent = 10) {
  const discountAmount = product.price * (discountPercent / 100);
  const discountedPrice = product.price - discountAmount;

  return {
    ...product,
    originalPrice: product.price,
    discountPercent: discountPercent,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    price: parseFloat(discountedPrice.toFixed(2)), // Override price with discounted
  };
}

/**
 * DECORATOR 4: Stock Status Decorator
 * Adds human-readable stock status
 *
 * @param {Object} product - The original product object
 * @returns {Object} - New product object with stockStatus field
 */
export function stockStatusDecorator(product) {
  let stockStatus = "Out of Stock";

  if (product.stock > 50) {
    stockStatus = "In Stock";
  } else if (product.stock > 10) {
    stockStatus = "Limited Stock";
  } else if (product.stock > 0) {
    stockStatus = "Low Stock";
  }

  return {
    ...product,
    stockStatus,
  };
}

/**
 * DECORATOR COMPOSITION HELPER
 * Allows chaining multiple decorators in a clean way
 *
 * Example usage:
 *   const enhanced = compose(
 *     product,
 *     priceWithTaxDecorator,
 *     promoLabelDecorator,
 *     stockStatusDecorator
 *   );
 *
 * This demonstrates the power of the Decorator pattern:
 * - Each decorator is independent and reusable
 * - Decorators can be combined in any order
 * - Easy to add/remove decorators without changing core logic
 *
 * @param {Object} product - The base product object
 * @param {...Function} decorators - Variable number of decorator functions
 * @returns {Object} - Fully decorated product
 */
export function compose(product, ...decorators) {
  // Apply each decorator in sequence, passing result to next
  return decorators.reduce((decorated, decorator) => {
    // Each decorator receives the result from the previous one
    return decorator(decorated);
  }, product);
}

/**
 * CONVENIENCE FUNCTION: Apply Tax Decorator
 * Wraps priceWithTaxDecorator with default tax rate
 */
export function applyTax(product) {
  return priceWithTaxDecorator(product, 0.15); // 15% tax
}

/**
 * CONVENIENCE FUNCTION: Apply Promo
 * Wraps promoLabelDecorator with a sale label
 */
export function applyPromo(product) {
  return promoLabelDecorator(product, "🔥 Hot Deal!");
}

/**
 * EXAMPLE: Full Enhancement Pipeline
 * This shows how to create a fully enhanced product with multiple decorators
 *
 * @param {Object} product - Base product
 * @param {Object} options - Options like { includeTax, includePromo }
 * @returns {Object} - Enhanced product
 */
export function enhanceProduct(product, options = {}) {
  let enhanced = { ...product };

  // Conditionally apply decorators based on options
  if (options.includeTax) {
    enhanced = priceWithTaxDecorator(enhanced, 0.15);
  }

  if (options.includePromo && product.featured) {
    enhanced = promoLabelDecorator(enhanced, "⭐ Featured");
  }

  if (options.includeStockStatus) {
    enhanced = stockStatusDecorator(enhanced);
  }

  if (options.discount) {
    enhanced = discountDecorator(enhanced, options.discount);
  }

  return enhanced;
}
