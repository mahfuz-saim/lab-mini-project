import React, { useState, useEffect } from "react";
import api from "../api/config";
import "./Landing.css";

/**
 * Landing Page Component
 *
 * Features:
 * - Hero section from API
 * - Featured products display
 * - Contact form with validation
 */
function Landing() {
  // State management
  const [landingData, setLandingData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    source: "landing-page",
  });
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch landing data and products on component mount
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fetch landing page data and featured products
   */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch landing content and featured products in parallel
      const [landing, featuredProducts] = await Promise.all([
        api.getLanding(),
        api.getProducts({ featured: true, limit: 6 }),
      ]);

      setLandingData(landing);
      setProducts(featuredProducts);
    } catch (err) {
      setError(err.message || "Failed to load page data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle contact form input changes
   */
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear status message when user types
    if (contactStatus.message) {
      setContactStatus({ type: "", message: "" });
    }
  };

  /**
   * Validate email format
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate contact form
   */
  const validateContactForm = () => {
    if (!contactForm.name || contactForm.name.trim().length < 2) {
      return "Please enter a valid name (at least 2 characters)";
    }
    if (!isValidEmail(contactForm.email)) {
      return "Please enter a valid email address";
    }
    if (!contactForm.message || contactForm.message.trim().length < 10) {
      return "Message must be at least 10 characters long";
    }
    if (contactForm.message.length > 1000) {
      return "Message must not exceed 1000 characters";
    }
    return null;
  };

  /**
   * Handle contact form submission
   */
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationError = validateContactForm();
    if (validationError) {
      setContactStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setContactStatus({ type: "", message: "" });

    try {
      // Submit to backend
      const result = await api.submitContact(contactForm);

      setContactStatus({
        type: "success",
        message: `Thank you! Your message has been received (ID: ${result.id})`,
      });

      // Clear form on success
      setContactForm({
        name: "",
        email: "",
        message: "",
        source: "landing-page",
      });
    } catch (err) {
      setContactStatus({
        type: "error",
        message: err.message || "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="landing-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="landing-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchData} className="btn-retry">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-container">
      {/* Hero Section */}
      {landingData?.hero && (
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">{landingData.hero.title}</h1>
            <p className="hero-subtitle">{landingData.hero.subtitle}</p>
            <a href={landingData.hero.ctaLink} className="btn-primary">
              {landingData.hero.ctaText}
            </a>
          </div>
        </section>
      )}

      {/* Features Section */}
      {landingData?.features && (
        <section className="features">
          <div className="features-grid">
            {landingData.features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section id="products" className="products-section">
        <h2 className="section-title">Featured Products</h2>

        {products.length === 0 ? (
          <p className="no-products">No products available</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                  ) : (
                    <div className="product-placeholder">📦</div>
                  )}
                  {product.featured && (
                    <span className="product-badge">Featured</span>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">
                    {product.description.substring(0, 80)}...
                  </p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    {product.stockStatus && (
                      <span
                        className={`stock-status ${product.stockStatus
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {product.stockStatus}
                      </span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="product-rating">
                      {"⭐".repeat(Math.floor(product.rating))} {product.rating}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-container">
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="Your message (min. 10 characters)"
                rows="5"
                required
              />
              <span className="char-count">
                {contactForm.message.length} / 1000 characters
              </span>
            </div>

            {/* Status Message */}
            {contactStatus.message && (
              <div className={`status-message ${contactStatus.type}`}>
                {contactStatus.message}
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Landing;
