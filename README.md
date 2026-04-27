# TrendyTreasure - Luxury E-Commerce Website

A full-stack luxury e-commerce platform built with React and Node.js.

## 🚀 Features

- **Product Catalog**: Browse luxury fashion and accessories
- **Search & Filter**: Search products and filter by category
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: JWT-based login/signup system
- **Checkout**: Complete order placement with shipping details
- **User Profile**: View order history and account information
- **Responsive Design**: Mobile-friendly interface

## 📁 Project Structure

```
TrendyTreasure/
├── BackEnd/
│   ├── data/              # JSON data storage
│   ├── utils/             # Controllers and helpers
│   └── server.js          # Express server
└── FrontEnd/
    ├── src/
    │   ├── components/    # React components
    │   ├── context/       # Context providers
    │   └── styles/        # CSS files
    └── index.html
```

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd BackEnd
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd FrontEnd
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🎯 Usage

1. **Browse Products**: Visit homepage to see featured products
2. **Search**: Use search bar to find specific items
3. **Filter by Category**: Click category cards to filter products
4. **Add to Cart**: Click "Add to Cart" on product cards
5. **Checkout**: Review cart and proceed to checkout
6. **Create Account**: Sign up to place orders
7. **Login**: Access your profile and order history

## 🔑 API Endpoints

- `POST /register` - User registration
- `POST /login` - User login
- `GET /products` - Get all products (with search/filter)
- `GET /products/:id` - Get single product
- `POST /cart` - Add to cart (authenticated)
- `GET /cart` - Get user cart (authenticated)
- `POST /orders` - Create order (authenticated)
- `GET /orders` - Get user orders (authenticated)

## 🎨 Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Context API (State Management)
- CSS3 (Custom Styling)
- Vite (Build Tool)

**Backend:**
- Node.js
- HTTP Module (Native)
- JWT Authentication
- JSON File Storage

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎨 Color Scheme

- Gold: `#D4AF37` (Primary accent)
- Black: `#0a0a0a` (Background)
- Card Background: `#121212`
- White: `#ffffff` (Text)
- Secondary Text: `#cccccc`

## 📝 License

This project is for educational purposes.
