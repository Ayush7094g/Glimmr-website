# 🎉 GLIMMR Website Setup Guide

## Overview
This guide will help you set up your Glimmr jewelry website with full functionality including user authentication, shopping cart, wishlist, orders, and an AI-powered chatbot with clothing recommendations.

## 🚀 Quick Start

### 1. Environment Setup

#### Backend (.env file)
Create a `.env` file in the `backend/` directory:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/glimmr

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-here

# OpenAI API Key for AI chatbot
OPENAI_API_KEY=your-openai-api-key-here

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Server Port
PORT=5000

# File Upload Settings
MAX_FILE_SIZE=5242880

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env file)
Create a `.env` file in the `frontend/` directory:

```bash
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api

# OpenAI API Key (if needed on frontend)
REACT_APP_OPENAI_API_KEY=your-openai-api-key-here

# App Configuration
REACT_APP_NAME=Glimmr
REACT_APP_DESCRIPTION=Luxury Jewelry & Fashion
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start Frontend (in new terminal)
```bash
cd frontend
npm start
```

## 🔧 What's Been Fixed/Added

### Backend (server.js)
✅ **Authentication System**
- User registration with password hashing
- User login with JWT tokens
- Protected routes with middleware
- User profile management

✅ **Shopping Cart**
- Add/remove items
- Update quantities
- Clear cart
- Cart persistence per user

✅ **Wishlist System**
- Add/remove items
- View wishlist
- User-specific wishlists

✅ **Order Management**
- Create orders (fake payment - always successful)
- View order history
- Order details with product information

✅ **Product Management**
- Product listing with filters
- Search functionality
- Category-based filtering
- Price range filtering

✅ **AI Chatbot**
- OpenAI integration
- Context switching (jewelry/clothing)
- Product recommendations
- Clothing advice

✅ **Security Features**
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation

### Frontend Components
✅ **Authentication**
- Login page with validation
- Registration page with validation
- Protected routes
- User context management

✅ **API Integration**
- Complete API service layer
- Authentication headers
- Error handling
- Token management

✅ **Enhanced Chatbot**
- AI-powered responses
- Context switching (jewelry/clothing)
- Product suggestions
- Real-time chat

## 🗄️ Database Schema

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  preferences: {
    faceShape: String,
    stylePreference: [String],
    priceRange: String,
    metalPreference: [String]
  }
}
```

### Products Collection
```javascript
{
  name: String (required),
  description: String,
  category: String (required),
  subcategory: String,
  price: Number (required),
  originalPrice: Number,
  discount: Number,
  images: [String],
  specifications: {
    material: String,
    weight: String,
    dimensions: String,
    gemstone: String,
    metalPurity: String
  },
  availability: {
    inStock: Boolean,
    quantity: Number
  },
  tags: [String],
  ratings: {
    average: Number,
    count: Number
  }
}
```

### Cart Collection
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number
  }]
}
```

### Wishlist Collection
```javascript
{
  userId: ObjectId (ref: User),
  items: [ObjectId (ref: Product)]
}
```

### Orders Collection
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number
  }],
  total: Number,
  status: String,
  shippingAddress: Object,
  createdAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - List products with filters
- `GET /api/products/:id` - Get product details

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/clear` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `POST /api/wishlist/remove` - Remove item from wishlist

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Chatbot
- `POST /api/chat` - Send message to AI
- `POST /api/chat/clothing-recommendations` - Get clothing advice

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations

## 🎯 Key Features

### 1. User Authentication
- Secure registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes

### 2. Shopping Experience
- Browse products with filters
- Add items to cart
- Manage wishlist
- Place orders (fake payment)

### 3. AI-Powered Chatbot
- **Jewelry Context**: Earring recommendations, style advice, product suggestions
- **Clothing Context**: Outfit suggestions, styling tips, fashion advice
- Real-time AI responses using OpenAI
- Product recommendations based on chat context

### 4. Product Management
- Comprehensive product catalog
- Search and filtering
- Category organization
- Image support

## 🚨 Important Notes

### 1. OpenAI API Key
- You need a valid OpenAI API key for the chatbot to work
- Add it to your backend `.env` file
- The chatbot will fall back to basic responses if the API is unavailable

### 2. MongoDB Connection
- Ensure MongoDB is running on your system
- The app will create the database and collections automatically
- Check the connection string in your `.env` file

### 3. Fake Payment System
- Orders are automatically marked as "completed"
- No real payment processing is implemented
- Perfect for testing and development

### 4. File Uploads
- Product images are stored in the `Uploads/` directory
- Ensure the directory exists and has write permissions

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

#### 2. Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` in frontend `.env`

#### 3. Chatbot not responding
- Check OpenAI API key in backend `.env`
- Verify internet connection
- Check browser console for errors

#### 4. Authentication issues
- Clear browser localStorage
- Check JWT_SECRET in backend `.env`
- Verify token expiration (24 hours)

### Debug Mode
To enable debug logging, add to backend `.env`:
```bash
DEBUG=true
NODE_ENV=development
```

## 🔮 Future Enhancements

### Planned Features
- Real payment integration (Stripe/PayPal)
- User reviews and ratings
- Advanced product filtering
- Email notifications
- Admin dashboard
- Inventory management
- Analytics and reporting

### Technical Improvements
- Redis caching
- Image optimization
- CDN integration
- WebSocket for real-time chat
- Progressive Web App (PWA)
- Mobile app development

## 📞 Support

If you encounter any issues:
1. Check the console logs in both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check MongoDB connection status

## 🎉 Congratulations!

Your Glimmr website is now fully functional with:
- ✅ User authentication system
- ✅ Shopping cart and wishlist
- ✅ Order management
- ✅ AI-powered chatbot
- ✅ Product recommendations
- ✅ Responsive design
- ✅ Security features

The website is ready for users to create accounts, browse products, add items to cart, and place orders. The AI chatbot provides intelligent assistance for both jewelry and clothing recommendations.

Happy coding! 🚀✨