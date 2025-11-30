/**
 * API Configuration and Helper Functions
 *
 * This module provides a centralized API client for making requests to the backend.
 * It reads the backend URL from environment variables and provides helper functions.
 */

// Get backend URL from environment variable
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

/**
 * Generic fetch helper with error handling
 * @param {string} endpoint - API endpoint (e.g., '/api/products')
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise} - Promise resolving to response data
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Throw error with backend error message if available
      throw new Error(
        data.error?.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

/**
 * API Client - Collection of API methods
 */
export const api = {
  // Health check
  health: () => apiFetch("/api/health"),

  // Landing page data
  getLanding: () => apiFetch("/api/landing"),

  // Products
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiFetch(`/api/products${queryString ? `?${queryString}` : ""}`);
  },

  getProductById: (id) => apiFetch(`/api/products/${id}`),

  // Contact form
  submitContact: (data) =>
    apiFetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export default api;
