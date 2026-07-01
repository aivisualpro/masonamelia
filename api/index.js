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
const AircraftCategory = createModel('AircraftCategory', 'aircraftcategories');
const WebsiteVisit = createModel('WebsiteVisit', 'websiteVisits');

/* -------------------------------------------------------------------------- */
/*                                   Routes                                  */
/* -------------------------------------------------------------------------- */

// Aircraft Categories
app.get('/api/aircraftCategories/lists', async (req, res) => {
  await connectToDatabase();
  try {
    const categories = await AircraftCategory.find({}).sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper for pagination
const getPaginatedData = async (Model, req, query = {}, sortObj = { createdAt: -1 }) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 16;
  const skip = (page - 1) * pageSize;

  const [data, totalItems] = await Promise.all([
    Model.find(query).sort(sortObj).skip(skip).limit(pageSize),
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

// Log website visits
app.post('/api/visits', async (req, res) => {
  await connectToDatabase();
  try {
    const { page, referrer, screenWidth, screenHeight } = req.body || {};
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
            || req.headers['x-real-ip']
            || req.connection?.remoteAddress
            || '';

    await WebsiteVisit.create({
      page:         page || '/',
      referrer:     referrer || '',
      userAgent,
      ip,
      screenWidth:  screenWidth || null,
      screenHeight: screenHeight || null,
      visitedAt:    new Date(),
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Visit log error:', err);
    // Non-blocking – don't fail the user's experience
    res.json({ success: false });
  }
});

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

// Single Team Member
app.get('/api/teams/lists/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const { id } = req.params;
    
    // Check if it's a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      const member = await Team.findById(id);
      if (member) {
        return res.json({ success: true, data: member });
      }
    }
    
    // Fallback to searching by slug or other criteria if needed, 
    // but for now we primarily use ID or return nothing
    res.status(404).json({ error: 'Member not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search Endpoint for SearchBox
app.get('/api/aircrafts/lists/search', async (req, res) => {
  await connectToDatabase();
  try {
    const { q } = req.query;
    const query = {};
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { model: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Limit results for autocomplete
    const aircrafts = await Aircraft.find({ ...query, isDeleted: { $ne: true } }).limit(20);
    res.json({ success: true, data: aircrafts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper: build a status match filter
function buildStatusFilter(status) {
  if (status && status !== 'all') {
    if (status === 'previous') return { $regex: new RegExp('sold', 'i') };
    // "Off Market" tab shows both 'off-market' and legacy 'acquired' aircraft
    if (status === 'off-market') return { $in: ['off-market', 'acquired'] };
    return { $regex: new RegExp(status, 'i') };
  }
  // 'all' filter excludes sold, acquired, and off-market - they only show via their specific tabs
  return { $nin: ['sold', 'acquired', 'off-market'] };
}

// Helper: resolve category slugs → ObjectIds
async function resolveCategorySlugs(categoryCsv) {
  if (!categoryCsv) return null;
  const slugs = categoryCsv.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  if (!slugs.length) return null;
  const cats = await AircraftCategory.find({ slug: { $in: slugs } }).select('_id');
  return cats.map(c => c._id);
}

// Aircrafts list (paginated)
app.get('/api/aircrafts/lists', async (req, res) => {
  await connectToDatabase();
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 16;
    const skip = (page - 1) * pageSize;

    const { searchKeyword, status, minPrice, maxPrice, minAirframe, maxAirframe, minEngine, maxEngine, categories } = req.query;
    const query = { isDeleted: { $ne: true } };

    query.status = buildStatusFilter(status);
    
    if (searchKeyword) {
      query.$or = [
        { title: { $regex: searchKeyword, $options: 'i' } },
        { model: { $regex: searchKeyword, $options: 'i' } }
      ];
    }

    const categoryIds = await resolveCategorySlugs(categories);
    if (categoryIds && categoryIds.length) {
      query.category = { $in: categoryIds };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minAirframe || maxAirframe) {
      query.airframe = {};
      if (minAirframe) query.airframe.$gte = Number(minAirframe);
      if (maxAirframe) query.airframe.$lte = Number(maxAirframe);
    }

    if (minEngine || maxEngine) {
      query.engine = {};
      if (minEngine) query.engine.$gte = Number(minEngine);
      if (maxEngine) query.engine.$lte = Number(maxEngine);
    }

    const pipeline = [
      { $match: query },
      // Coerce null/missing index to large number → nulls sort last
      { $addFields: { _sortIdx: { $ifNull: ['$index', 999999] } } },
      { $sort: { _sortIdx: 1, createdAt: -1 } },
      // Populate category
      { $lookup: { from: 'aircraftcategories', localField: 'category', foreignField: '_id', as: '_cat' } },
      { $addFields: { category: { $ifNull: [{ $arrayElemAt: ['$_cat', 0] }, '$category'] } } },
      { $unset: ['_sortIdx', '_cat'] },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: pageSize }],
          totalCount: [{ $count: 'count' }]
        }
      }
    ];

    const result = await Aircraft.aggregate(pipeline);
    const data = result[0]?.data || [];
    const totalItems = result[0]?.totalCount[0]?.count || 0;

    res.json({
      success: true,
      data,
      totalItems,
      page,
      pageSize,
      pageCount: Math.ceil(totalItems / pageSize),
      hasNext: page * pageSize < totalItems,
      hasPrev: page > 1
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aircraft Ranges (respects status + categories filters)
app.get('/api/aircrafts/lists/ranges', async (req, res) => {
  await connectToDatabase();
  try {
    const { status, categories } = req.query;
    const matchStage = { isDeleted: { $ne: true } };

    matchStage.status = buildStatusFilter(status);

    const categoryIds = await resolveCategorySlugs(categories);
    if (categoryIds && categoryIds.length) {
      matchStage.category = { $in: categoryIds };
    }

    const pipeline = [
      { $match: matchStage },
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
    ];

    const result = await Aircraft.aggregate(pipeline);
    res.json({ success: true, data: result[0] || {} });
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
    if (category && category !== 'undefined') query.category = category;
    if (status && status !== 'undefined') query.status = { $regex: new RegExp(status, 'i') };
    
    const aircrafts = await Aircraft.find({ ...query, isDeleted: { $ne: true } }).limit(8).sort({ createdAt: -1 });
    res.json({ success: true, data: aircrafts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Single Aircraft (by slug or ObjectId)
app.get('/api/aircrafts/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const param = req.params.id;
    // Try slug lookup first, then fallback to ObjectId
    let aircraft = await Aircraft.findOne({ slug: param });
    if (!aircraft) {
      // Check if param looks like a valid MongoDB ObjectId (24 hex chars)
      if (/^[0-9a-fA-F]{24}$/.test(param)) {
        aircraft = await Aircraft.findById(param);
      }
    }
    if (!aircraft) return res.status(404).json({ error: 'Aircraft not found' });
    res.json({ success: true, data: aircraft });
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
