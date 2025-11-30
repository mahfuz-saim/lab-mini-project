class ProductBuilder {
  constructor() {
    // Initialize an empty product object
    // This will be populated through chainable methods
    this.product = {};
  }

  /**
   * Sets the base information of the product
   * @param {Object} data - Object containing id, name, description, price, category
   * @returns {ProductBuilder} - Returns this for method chaining
   */
  withBaseInfo(data) {
    this.product.id = data.id;
    this.product.name = data.name;
    this.product.description = data.description;
    this.product.price = data.price;
    this.product.category = data.category;
    return this; // Return 'this' to enable chaining
  }

  /**
   * Adds variant information to the product (colors, sizes, etc.)
   * @param {Array} variants - Array of variant objects
   * @returns {ProductBuilder} - Returns this for method chaining
   */
  withVariants(variants) {
    this.product.variants = variants || [];
    return this;
  }

  /**
   * Adds metadata like stock, featured status, image URLs
   * @param {Object} meta - Metadata object
   * @returns {ProductBuilder} - Returns this for method chaining
   */
  withMetadata(meta) {
    this.product.stock = meta.stock || 0;
    this.product.featured = meta.featured || false;
    this.product.imageUrl = meta.imageUrl || "";
    this.product.rating = meta.rating || 0;
    return this;
  }

  /**
   * Adds tags/keywords to the product
   * @param {Array} tags - Array of tag strings
   * @returns {ProductBuilder} - Returns this for method chaining
   */
  withTags(tags) {
    this.product.tags = tags || [];
    return this;
  }

  /**
   * BUILD METHOD - Finalizes and returns the constructed product
   * This is the final step that returns the complete product object
   * @returns {Object} - The fully constructed product
   */
  build() {
    // Return a copy of the product to prevent external modifications
    return { ...this.product };
  }

  /**
   * Static factory method for creating a builder from raw data
   * Useful when you have complete data and want to use the builder pattern
   * @param {Object} rawData - Complete product data
   * @returns {Object} - Built product
   */
  static fromData(rawData) {
    return new ProductBuilder()
      .withBaseInfo({
        id: rawData.id,
        name: rawData.name,
        description: rawData.description,
        price: rawData.price,
        category: rawData.category,
      })
      .withVariants(rawData.variants)
      .withMetadata({
        stock: rawData.stock,
        featured: rawData.featured,
        imageUrl: rawData.imageUrl,
        rating: rawData.rating,
      })
      .withTags(rawData.tags)
      .build();
  }
}

export default ProductBuilder;
