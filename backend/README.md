# Backend API

Express.js REST API with in-memory data store.

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Running

Development mode with hot reload:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Health Check

- `GET /api/health` - Returns server status

### Landing Page

- `GET /api/landing` - Returns hero, features, and featured product IDs

### Products

- `GET /api/products` - List all products
  - Query params: `limit`, `featured`, `q` (search), `tax` (add tax calculation)
- `GET /api/products/:id` - Get product by ID

### Contact

- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, message, source }`
  - Returns: `{ id, status: "received" }`

## Design Patterns

- **Builder Pattern**: `lib/ProductBuilder.js` - Constructs product DTOs
- **Decorator Pattern**: `lib/productDecorators.js` - Enhances products with computed fields

## Data

Seed data is loaded from `data/seed.json` on server start.
