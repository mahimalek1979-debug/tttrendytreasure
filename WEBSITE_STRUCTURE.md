# TrendyTreasure - Website Structure & Features

## 🎨 Design Theme
- **Style**: Luxury E-Commerce
- **Colors**: Gold (#D4AF37) & Black (#0a0a0a)
- **Fonts**: Playfair Display (headings) + Lato (body)

## 📄 Pages & Routes

### 1. Home Page (`/`)
**Components:**
- Navbar (fixed top)
- Hero Section (full-screen banner)
- Categories Section (Fashion & Accessories)
- Featured Products Grid
- Footer

**Features:**
- Search products
- Filter by category
- Add to cart
- Responsive design

### 2. Login Page (`/login`)
**Features:**
- Email/password authentication
- JWT token generation
- Redirect to home after login
- Link to signup page

### 3. Signup Page (`/signup`)
**Features:**
- User registration
- Name, email, password fields
- Redirect to login after signup
- Link to login page

### 4. Checkout Page (`/checkout`)
**Features:**
- Order summary
- Shipping information form
- Total calculation
- Place order (requires authentication)
- Success message

### 5. Profile Page (`/profile`) - Protected
**Features:**
- User information display
- Order history
- Protected route (requires login)

## 🛒 Shopping Cart (Sidebar)
**Features:**
- Slide-in from right
- Product list with images
- Quantity controls (+/-)
- Remove items
- Total calculation
- Proceed to checkout button
- Persistent storage (localStorage)

## 🔐 Authentication Flow

```
New User → Signup → Login → Browse → Add to Cart → Checkout → Profile
Existing User → Login → Browse → Add to Cart → Checkout → Profile
```

## 🎯 Key Features

### Product Management
- Display all products
- Search by name/description
- Filter by category
- Product images from Unsplash
- Price in INR format

### Cart Management
- Add products
- Update quantities
- Remove items
- Calculate totals
- Persist in localStorage

### User Management
- Registration
- Login/Logout
- JWT authentication
- Protected routes
- User profile

### Order Management
- Create orders
- View order history
- Order status tracking

## 🎨 UI Components

### Navbar
- Logo with icon
- Search bar
- Navigation links
- Cart icon with count
- User menu (login/logout)
- Mobile responsive menu

### Product Card
- Product image
- Product name
- Price
- Add to cart button (on hover)
- Hover effects

### Category Card
- Category image
- Category name overlay
- Click to filter
- Hover zoom effect

### Forms
- Login form
- Signup form
- Checkout form
- Input validation
- Error messages

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎭 Animations

- Fade in up (Hero section)
- Hover scale (Products & Categories)
- Slide in (Cart sidebar)
- Transform on hover (Buttons)

## 🔄 State Management

### Context API
1. **AuthContext**
   - User data
   - Token
   - Login/Logout functions
   - Authentication status

2. **CartContext**
   - Cart items
   - Add/Remove/Update functions
   - Cart count
   - Total calculation
   - Format price utility

## 🌐 API Integration

### Endpoints Used
- `POST /register` - User signup
- `POST /login` - User login
- `GET /products` - Fetch products
- `POST /cart` - Add to cart
- `GET /cart` - Get cart items
- `POST /orders` - Place order
- `GET /orders` - Get order history

### Authentication
- JWT tokens in localStorage
- Bearer token in headers
- Protected routes check

## 💾 Data Storage

### Frontend (localStorage)
- Cart items
- User data
- JWT token

### Backend (JSON files)
- users.json
- products.json
- cart.json
- orders.json

## 🎯 User Journey

1. **First Visit**
   - See hero banner
   - Browse categories
   - View products
   - Add to cart (no login needed)

2. **Checkout**
   - Review cart
   - Login/Signup required
   - Fill shipping details
   - Place order

3. **After Purchase**
   - View order confirmation
   - Check profile for order history
   - Continue shopping

## 🚀 Performance Features

- Lazy loading images
- Optimized animations
- Efficient re-renders
- LocalStorage caching
- Responsive images

## 🎨 Visual Hierarchy

1. **Primary**: Gold buttons, prices, headings
2. **Secondary**: White text, product names
3. **Tertiary**: Gray text, descriptions
4. **Background**: Black/dark gray cards

This structure creates a premium, luxury shopping experience! ✨
