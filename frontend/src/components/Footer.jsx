import React from "react";
import "./Footer.css";

/**
 * Footer Component
 * Simple footer with copyright and links
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Copyright */}
        <div className="footer-section">
          <p className="footer-copyright">
            © {currentYear} ShopHub. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <div className="footer-links">
            <a href="#about" className="footer-link">
              About
            </a>
            <a href="#privacy" className="footer-link">
              Privacy Policy
            </a>
            <a href="#terms" className="footer-link">
              Terms of Service
            </a>
            <a href="#contact" className="footer-link">
              Contact Us
            </a>
          </div>
        </div>

        {/* Social or extra info */}
        <div className="footer-section">
          <p className="footer-tagline">
            Quality products, delivered with care 📦
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
