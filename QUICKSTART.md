# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation & Running

### Option 1: Manual Setup

**Terminal 1 - Backend:**
```bash
cd BackEnd
npm install
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd FrontEnd
npm install
npm run dev
```

### Option 2: Quick Commands

**Backend (Port 5000):**
```bash
cd BackEnd && npm install && node server.js
```

**Frontend (Port 5173):**
```bash
cd FrontEnd && npm install && npm run dev
```

## Access the Website

Open your browser and go to: `http://localhost:5173`

## Test Credentials

You can create a new account or use these test steps:
1. Click "Sign Up" 
2. Fill in your details
3. Login with your credentials
4. Start shopping!

## Features to Try

✅ Browse products on homepage
✅ Search for products
✅ Filter by category (Fashion/Accessories)
✅ Add items to cart
✅ Update cart quantities
✅ Proceed to checkout
✅ View order history in profile

## Troubleshooting

**Port already in use:**
- Backend: Change PORT in `BackEnd/server.js`
- Frontend: Vite will prompt for alternative port

**CORS errors:**
- Ensure backend is running on port 5000
- Check browser console for details

**Products not loading:**
- Verify backend server is running
- Check `BackEnd/data/products.json` exists

## Project URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Products API: http://localhost:5000/products

Enjoy shopping at TrendyTreasure! 🛍️✨
