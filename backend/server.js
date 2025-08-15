// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const OpenAI = require('openai');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use('/uploads', express.static('Uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
}).then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
});

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  subcategory: String,
  price: { type: Number, required: true },
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
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 }
  },
  tags: [String],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'Uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: process.env.MAX_FILE_SIZE } });

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();
    
    // Create cart and wishlist for new user
    await Cart.create({ userId: user._id, items: [] });
    await Wishlist.create({ userId: user._id, items: [] });
    
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    // Return user data without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      preferences: user.preferences
    };
    
    res.status(201).json({ token, user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    // Return user data without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      preferences: user.preferences
    };
    
    res.json({ token, user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { category, subcategory, search, minPrice, maxPrice, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let query = {};
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Subcategory filter
    if (subcategory) {
      query.subcategory = subcategory;
    }
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(50);
    
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/products/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/cart', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/cart/add', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    
    // Populate product details for response
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/cart/remove', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    
    // Populate product details for response
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/cart/update', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      
      // Populate product details for response
      const populatedCart = await Cart.findById(cart._id).populate('items.product');
      res.json(populatedCart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/api/cart/clear', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/wishlist', authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.userId }).populate('items');
    res.json(wishlist || { items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/wishlist/add', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.user.userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.userId, items: [] });
    }
    if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
      await wishlist.save();
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/wishlist/remove', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId: req.user.userId });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    wishlist.items = wishlist.items.filter(item => item.toString() !== productId);
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/orders/create', authMiddleware, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;
    
    // Validate cart items
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    const order = new Order({
      userId: req.user.userId,
      items: cart.items,
      total,
      shippingAddress: shippingAddress || {},
      status: 'completed' // Fake payment - always successful
    });
    
    await order.save();
    
    // Clear cart after successful order
    await Cart.findOneAndUpdate({ userId: req.user.userId }, { items: [] });
    
    // Populate product details for response
    const populatedOrder = await Order.findById(order._id).populate('items.product');
    res.json(populatedOrder);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/orders/:orderId', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId, 
      userId: req.user.userId 
    }).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message, userId, context = 'jewelry' } = req.body;
  
  try {
    let systemPrompt = '';
    let suggestedProducts = [];
    
    // Determine context and set appropriate system prompt
    if (context === 'clothing') {
      systemPrompt = `You are Glimmr's AI fashion assistant specializing in clothing recommendations. 
      You help users find the perfect outfits for different occasions, body types, and styles. 
      Provide helpful fashion advice, styling tips, and outfit suggestions. 
      Be friendly, knowledgeable, and specific in your recommendations.`;
    } else {
      systemPrompt = `You are Glimmr's AI jewelry assistant. Provide helpful responses on jewelry, 
      recommending earrings based on face shape, style, or ethnic outfits (e.g., sarees, lehengas). 
      Suggest products from our collection. Be friendly and knowledgeable about jewelry trends and styling.`;
    }
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    const response = completion.choices[0].message.content;

    // Product recommendations based on context
    if (context === 'clothing') {
      // For clothing context, suggest based on message content
      const clothingKeywords = message.toLowerCase().split(' ').filter(word => 
        ['dress', 'saree', 'lehenga', 'kurta', 'top', 'blouse', 'pants', 'skirt'].includes(word)
      );
      
      if (clothingKeywords.length > 0) {
        // In a real app, you'd have a clothing products collection
        // For now, we'll return jewelry that might complement the clothing
        suggestedProducts = await Product.find({
          'availability.inStock': true,
          tags: { $in: ['ethnic', 'traditional', 'modern'] }
        }).limit(3);
      }
    } else {
      // For jewelry context, suggest jewelry products
      if (message.toLowerCase().includes('recommend') || message.toLowerCase().includes('earring')) {
        const keywords = message.toLowerCase().split(' ').filter(word => 
          ['studs', 'jhumkas', 'hoops', 'drops', 'chandeliers', 'traditional', 'modern'].includes(word)
        );
        
        suggestedProducts = await Product.find({
          category: 'earrings',
          'availability.inStock': true,
          ...(keywords.length > 0 && { subcategory: { $in: keywords } })
        }).limit(3);
      }
    }

    res.json({
      response,
      suggestedProducts: suggestedProducts.map(p => ({
        id: p._id,
        name: p.name,
        price: p.price,
        image: p.images[0],
        category: p.category
      })),
      context
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Chat error', error: error.message });
  }
});

// Enhanced clothing recommendations endpoint
app.post('/api/chat/clothing-recommendations', async (req, res) => {
  const { occasion, bodyType, style, budget } = req.body;
  
  try {
    const prompt = `Provide detailed clothing recommendations for:
    Occasion: ${occasion}
    Body Type: ${bodyType}
    Style Preference: ${style}
    Budget: ${budget}
    
    Give specific outfit suggestions, styling tips, and color recommendations.`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are a professional fashion stylist. Provide detailed, practical clothing recommendations with specific styling advice.' 
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.8,
    });
    
    res.json({
      recommendations: completion.choices[0].message.content,
      occasion,
      bodyType,
      style,
      budget
    });
  } catch (error) {
    console.error('Clothing recommendations error:', error);
    res.status(500).json({ message: 'Recommendations error', error: error.message });
  }
});

app.get('/api/recommendations', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const preferences = user?.preferences || {};
    const products = await Product.find({
      category: 'earrings',
      'availability.inStock': true,
      ...(preferences.faceShape && { tags: preferences.faceShape }),
      ...(preferences.priceRange && { price: { $lte: parseInt(preferences.priceRange.split('-')[1]) || 5000 } })
    }).limit(5);
    res.json(products);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User profile endpoints
app.get('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, preferences } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update allowed fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (preferences) user.preferences = preferences;
    
    await user.save();
    
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      preferences: user.preferences
    };
    
    res.json(userResponse);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));