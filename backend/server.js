// server.js
const express = require('express');
const mongoose = require('mongoose'); // Added mongoose import
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
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
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
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
    res.json(cart);
  } catch (error) {
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
    res.json(cart);
  } catch (error) {
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
    const { items, total } = req.body;
    const order = new Order({
      userId: req.user.userId,
      items,
      total,
      status: 'completed' // Fake payment
    });
    await order.save();
    await Cart.findOneAndUpdate({ userId: req.user.userId }, { items: [] });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message, userId } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are Glimmr\'s AI jewelry assistant. Provide helpful responses on jewelry, recommending earrings based on face shape, style, or ethnic outfits (e.g., sarees, lehengas). Suggest products from our collection.' },
        { role: 'user', content: message }
      ],
    });
    const response = completion.choices[0].message.content;

    let suggestedProducts = [];
    if (message.toLowerCase().includes('recommend') || message.toLowerCase().includes('earring')) {
      const keywords = message.toLowerCase().split(' ').filter(word => ['studs', 'jhumkas', 'hoops', 'drops', 'chandeliers'].includes(word));
      suggestedProducts = await Product.find({
        category: 'earrings',
        'availability.inStock': true,
        ...(keywords.length > 0 && { subcategory: { $in: keywords } })
      }).limit(3);
    }

    res.json({
      response,
      suggestedProducts: suggestedProducts.map(p => ({
        id: p._id,
        name: p.name,
        price: p.price,
        image: p.images[0]
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Chat error', error: error.message });
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));