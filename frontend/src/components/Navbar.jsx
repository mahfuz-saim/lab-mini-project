import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

/**
 * Navbar Component
 * Responsive navigation bar with logo and links
 */
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">ShopHub</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="toggle-icon">{isMenuOpen ? "✕" : "☰"}</span>
        </button>

        {/* Navigation links */}
        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link
              to="/"
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <a
              href="#products"
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#contact"
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
