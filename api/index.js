const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

let conn = null;
const uri = process.env.MONGO_URL;

async function connectToDatabase() {
  if (conn) return conn;
  if (!uri) throw new Error('MONGO_URL is not defined in environment variables');
  
  try {
    conn = await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Generic Schemas (strict: false to adapt to existing data)
const createModel = (name, collection) => {
  return mongoose.models[name] || mongoose.model(name, new mongoose.Schema({}, { strict: false, timestamps: true }), collection);
};

const Aircraft = createModel('Aircraft', 'aircrafts');
const Brand = createModel('Brand', 'brands');
const Review = createModel('Review', 'reviews');
const Contact = createModel('Contact', 'contacts');
const BlogCategory = createModel('BlogCategory', 'blogcategories');
const Blog = createModel('Blog', 'blogs');
const Team = createModel('Team', 'teams');
const User = createModel('User', 'users');

// Helper for pagination
const getPaginatedData = async (Model, req, query = {}) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 16;
  const skip = (page - 1) * pageSize;

  const [data, totalItems] = await Promise.all([
    Model.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
    Model.countDocuments(query)
  ]);

  return {
    success: true,
    data,
    totalItems,
    page,
    pageSize,
    pageCount: Math.ceil(totalItems / pageSize),
    hasNext: page * pageSize < totalItems,
    hasPrev: page > 1
  };
};

/* --- Routes --- */

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Brands
app.get('/api/brands/lists', async (req, res) => {
  await connectToDatabase();
  try {
    const brands = await Brand.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: brands });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reviews
app.get('/api/reviews/lists', async (req, res) => {
  await connectToDatabase();
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Teams
app.get('/api/teams/lists', async (req, res) => {
  await connectToDatabase();
  try {
    const teams = await Team.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: teams });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aircrafts
app.get('/api/aircrafts/lists', async (req, res) => {
  await connectToDatabase();
  try {
    const { searchKeyword, status, minPrice, maxPrice, minAirframe, maxAirframe, minEngine, maxEngine, categories } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = { $regex: new RegExp(status, 'i') };
    }
    
    if (searchKeyword) {
      query.$or = [
        { title: { $regex: searchKeyword, $options: 'i' } },
        { model: { $regex: searchKeyword, $options: 'i' } }
      ];
    }

    if (categories) {
       // Assuming categories is a comma-separated list of slugs or IDs
       // This depends on how it's stored. Inspect DB showed 'category' might be a populated field or ID.
       // For simple reconstruction, we skip complex category filter or assume slug match if possible.
       // Ignoring for now to prevent crash, or adding simple check.
    }

    // Range queries
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // ... similarly for airframe, engine if fields match DB schema
    
    const result = await getPaginatedData(Aircraft, req, query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aircraft Ranges
app.get('/api/aircrafts/lists/ranges', async (req, res) => {
  await connectToDatabase();
  try {
    // Basic aggregation to get min/max
    const result = await Aircraft.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          minAirframe: { $min: "$airframe" },
          maxAirframe: { $max: "$airframe" },
          minEngine: { $min: "$engine" },
          maxEngine: { $max: "$engine" }
        }
      }
    ]);
    res.json({ success: true, data: result[0] || {} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Single Aircraft
app.get('/api/aircrafts/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const aircraft = await Aircraft.findById(req.params.id);
    if (!aircraft) return res.status(404).json({ error: 'Aircraft not found' });
    res.json({ success: true, data: aircraft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Related Aircrafts
app.get('/api/aircrafts/relatedAircrafts', async (req, res) => {
  await connectToDatabase();
  try {
    const { category, status } = req.query;
    const query = {};
    if (category) query['category.name'] = { $regex: new RegExp(category, 'i') };
    if (status) query.status = { $regex: new RegExp(status, 'i') };
    
    const aircrafts = await Aircraft.find(query).limit(8).sort({ createdAt: -1 });
    res.json({ success: true, data: aircrafts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contacts
app.get('/api/contacts', async (req, res) => {
    await connectToDatabase();
    try {
        const contact = await Contact.findOne();
        res.json({ success: true, data: contact });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fallback for contact "lists" if that's what frontend calls? Usually singleton.

module.exports = app;
