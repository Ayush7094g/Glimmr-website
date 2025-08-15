// seedData.js - Populate database with sample jewelry products
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jewelry_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product Schema (same as in server.js)
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

const Product = mongoose.model('Product', productSchema);

// Sample jewelry products data
const sampleProducts = [
  {
    name: "Classic Diamond Studs",
    description: "Elegant diamond stud earrings perfect for everyday wear and special occasions.",
    category: "earrings",
    subcategory: "studs",
    price: 2500,
    originalPrice: 3000,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500"
    ],
    specifications: {
      material: "Sterling Silver",
      weight: "2.5g",
      dimensions: "6mm diameter",
      gemstone: "Cubic Zirconia",
      metalPurity: "925 Silver"
    },
    availability: {
      inStock: true,
      quantity: 25
    },
    tags: ["classic", "diamond", "everyday", "elegant"],
    ratings: {
      average: 4.5,
      count: 123
    }
  },
  {
    name: "Rose Gold Hoops",
    description: "Beautiful rose gold plated hoop earrings that add glamour to any outfit.",
    category: "earrings",
    subcategory: "hoops",
    price: 1800,
    originalPrice: 2200,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500"
    ],
    specifications: {
      material: "Rose Gold Plated",
      weight: "3.2g",
      dimensions: "25mm diameter",
      gemstone: "None",
      metalPurity: "18K Gold Plated"
    },
    availability: {
      inStock: true,
      quantity: 18
    },
    tags: ["hoops", "rose-gold", "glamorous", "medium"],
    ratings: {
      average: 4.3,
      count: 89
    }
  },
  {
    name: "Ethnic Jhumka Earrings",
    description: "Traditional Indian jhumka earrings with intricate design and pearls.",
    category: "earrings",
    subcategory: "jhumkas",
    price: 3200,
    originalPrice: 4000,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500"
    ],
    specifications: {
      material: "Gold Plated",
      weight: "8.5g",
      dimensions: "40mm length",
      gemstone: "Pearls, Kundan",
      metalPurity: "22K Gold Plated"
    },
    availability: {
      inStock: true,
      quantity: 12
    },
    tags: ["ethnic", "traditional", "jhumka", "bridal", "pearls"],
    ratings: {
      average: 4.7,
      count: 156
    }
  },
  {
    name: "Pearl Drop Earrings",
    description: "Sophisticated pearl drop earrings perfect for formal occasions.",
    category: "earrings",
    subcategory: "drop",
    price: 2800,
    originalPrice: 3500,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500"
    ],
    specifications: {
      material: "Sterling Silver",
      weight: "4.1g",
      dimensions: "30mm length",
      gemstone: "Fresh Water Pearls",
      metalPurity: "925 Silver"
    },
    availability: {
      inStock: true,
      quantity: 20
    },
    tags: ["pearls", "drop", "elegant", "formal"],
    ratings: {
      average: 4.4,
      count: 92
    }
  },
  {
    name: "Geometric Statement Earrings",
    description: "Modern geometric design statement earrings for the fashion-forward.",
    category: "earrings",
    subcategory: "statement",
    price: 2200,
    originalPrice: 2800,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500"
    ],
    specifications: {
      material: "Brass",
      weight: "5.2g",
      dimensions: "45mm length",
      gemstone: "None",
      metalPurity: "Gold Plated Brass"
    },
    availability: {
      inStock: true,
      quantity: 15
    },
    tags: ["geometric", "modern", "statement", "bold"],
    ratings: {
      average: 4.2,
      count: 67
    }
  },
  {
    name: "Vintage Chandelier Earrings",
    description: "Stunning vintage-inspired chandelier earrings with crystals and beads.",
    category: "earrings",
    subcategory: "chandelier",
    price: 4200,
    originalPrice: 5500,
    discount: 24,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500"
    ],
    specifications: {
      material: "Antique Gold Plated",
      weight: "12.3g",
      dimensions: "65mm length",
      gemstone: "Austrian Crystals",
      metalPurity: "18K Gold Plated"
    },
    availability: {
      inStock: true,
      quantity: 8
    },
    tags: ["vintage", "chandelier", "crystals", "bridal", "heavy"],
    ratings: {
      average: 4.8,
      count: 201
    }
  },
  {
    name: "Minimalist Gold Bars",
    description: "Simple and elegant gold bar earrings for the minimalist style lover.",
    category: "earrings",
    subcategory: "bars",
    price: 1500,
    originalPrice: 1800,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500"
    ],
    specifications: {
      material: "14K Gold Filled",
      weight: "1.8g",
      dimensions: "20mm length",
      gemstone: "None",
      metalPurity: "14K Gold Filled"
    },
    availability: {
      inStock: true,
      quantity: 30
    },
    tags: ["minimalist", "gold", "simple", "everyday"],
    ratings: {
      average: 4.1,
      count: 45
    }
  },
  {
    name: "Colorful Tassel Earrings",
    description: "Fun and vibrant tassel earrings perfect for festivals and casual wear.",
    category: "earrings",
    subcategory: "tassel",
    price: 1200,
    originalPrice: 1500,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500"
    ],
    specifications: {
      material: "Cotton Thread, Metal",
      weight: "3.5g",
      dimensions: "50mm length",
      gemstone: "None",
      metalPurity: "Brass Base"
    },
    availability: {
      inStock: true,
      quantity: 22
    },
    tags: ["tassel", "colorful", "casual", "festival", "fun"],
    ratings: {
      average: 4.0,
      count: 78
    }
  },
  {
    name: "Crystal Cluster Studs",
    description: "Sparkling crystal cluster stud earrings that catch the light beautifully.",
    category: "earrings",
    subcategory: "studs",
    price: 2100,
    originalPrice: 2600,
    discount: 19,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500"
    ],
    specifications: {
      material: "Sterling Silver",
      weight: "3.1g",
      dimensions: "8mm diameter",
      gemstone: "Swarovski Crystals",
      metalPurity: "925 Silver"
    },
    availability: {
      inStock: true,
      quantity: 16
    },
    tags: ["crystal", "sparkle", "studs", "party", "glamorous"],
    ratings: {
      average: 4.6,
      count: 134
    }
  },
  {
    name: "Bohemian Feather Earrings",
    description: "Free-spirited bohemian feather earrings with natural stones.",
    category: "earrings",
    subcategory: "feather",
    price: 1800,
    originalPrice: 2200,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500"
    ],
    specifications: {
      material: "Bronze, Feathers",
      weight: "4.8g",
      dimensions: "70mm length",
      gemstone: "Turquoise, Agate",
      metalPurity: "Bronze Alloy"
    },
    availability: {
      inStock: true,
      quantity: 10
    },
    tags: ["bohemian", "feather", "natural", "hippie", "long"],
    ratings: {
      average: 4.3,
      count: 56
    }
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${insertedProducts.length} sample products`);

    console.log('\n📦 Sample Products Added:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    console.log('💡 You can now test your API endpoints with real data');
    console.log('🌐 Visit: http://localhost:5000/api/products to see all products');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('📡 Database connection closed');
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleProducts };