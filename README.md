# Full-Stack Application with Design Patterns

A full-stack web application demonstrating the **Builder** and **Decorator** design patterns with a React frontend and Express backend.

## Features

- **Frontend**: React + Vite with product listing and contact form
- **Backend**: Express REST API with in-memory data store
- **Design Patterns**:
  - Builder pattern for constructing product DTOs
  - Decorator pattern for enhancing products with computed fields

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Quick Start

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port shown in terminal)

## Project Structure

```
.
├── backend/          # Express API server
│   ├── data/         # Seed data
│   ├── lib/          # Design pattern implementations
│   ├── routes/       # API routes
│   └── services/     # Business logic
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── api/         # API client
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/landing` - Landing page content
- `GET /api/products` - List products (supports `limit`, `featured`, `q`, `tax` params)
- `GET /api/products/:id` - Get product details
- `POST /api/contact` - Submit contact form

## Design Patterns

### Builder Pattern

Located in `backend/lib/ProductBuilder.js` - Used to construct complex product DTOs with chainable methods.

### Decorator Pattern

Located in `backend/lib/productDecorators.js` - Used to enhance products with additional computed fields like tax calculations and promo labels.

## Environment Variables

See `.env.example` files in both `frontend/` and `backend/` directories for required configuration.

## License

MIT
