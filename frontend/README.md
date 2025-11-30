# Frontend React App

React application built with Vite.

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Make sure `VITE_BACKEND_URL` points to your backend server (default: `http://localhost:4000`).

## Running

Development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Structure

```
src/
├── api/          # API client and configuration
├── components/   # Reusable components (Navbar, Footer)
├── pages/        # Page components (Landing)
├── App.jsx       # Main app component with routing
└── main.jsx      # Application entry point
```

## Features

- Product listing with featured products
- Contact form with validation
- Responsive navbar and footer
- API integration with backend
- Error handling and user feedback
