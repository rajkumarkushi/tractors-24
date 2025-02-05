const { db, storage } = require('../config/firebase');

const createListing = async (req, res) => {
  try {
    const { title, brand, model, year, price, description, location } = req.body;
    
    const tractorData = {
      title,
      brand,
      model,
      year,
      price,
      description,
      location,
      sellerId: req.user.uid,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('tractors').add(tractorData);
    res.status(201).json({ id: docRef.id, ...tractorData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchTractors = async (req, res) => {
  try {
    const { state, city, minPrice, maxPrice } = req.query;
    let query = db.collection('tractors').where('status', '==', 'ACTIVE');

    if (state) {
      query = query.where('location.state', '==', state);
    }
    if (city) {
      query = query.where('location.city', '==', city);
    }

    const snapshot = await query.get();
    let tractors = [];

    snapshot.forEach(doc => {
      const tractor = { id: doc.id, ...doc.data() };
      if (minPrice && tractor.price < minPrice) return;
      if (maxPrice && tractor.price > maxPrice) return;
      tractors.push(tractor);
    });

    res.json(tractors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createListing,
  searchTractors
};

const { db } = require('../config/firebase');

const tractorController = {
  async searchTractors(req, res) {
    try {
      const { state, district } = req.query;
      
      // Start building the query
      let tractorRef = db.collection('tractors');
      
      // Add filters
      if (state) {
        tractorRef = tractorRef.where('state', '==', state);
      }
      
      if (district) {
        tractorRef = tractorRef.where('district', '==', district);
      }

      // Execute query
      const snapshot = await tractorRef
        .orderBy('createdAt', 'desc')
        .limit(20) // Limit results for pagination
        .get();

      const tractors = [];
      snapshot.forEach(doc => {
        tractors.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Get total count for pagination
      const totalCount = snapshot.size;

      res.json({
        tractors,
        totalCount,
        currentPage: 1,
        totalPages: Math.ceil(totalCount / 20)
      });

    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ 
        message: 'Failed to search tractors',
        error: error.message 
      });
    }
  },

  // Add pagination support
  async searchTractorsWithPagination(req, res) {
    try {
      const { state, district, page = 1, limit = 20 } = req.query;
      
      let tractorRef = db.collection('tractors');
      
      // Apply filters
      if (state) {
        tractorRef = tractorRef.where('state', '==', state);
      }
      
      if (district) {
        tractorRef = tractorRef.where('district', '==', district);
      }

      // Get total count
      const countSnapshot = await tractorRef.count().get();
      const totalCount = countSnapshot.data().count;

      // Get paginated results
      const snapshot = await tractorRef
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .offset((page - 1) * limit)
        .get();

      const tractors = [];
      snapshot.forEach(doc => {
        tractors.push({
          id: doc.id,
          ...doc.data()
        });
      });

      res.json({
        tractors,
        totalCount,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        hasMore: tractors.length === limit
      });

    } catch (error) {
      console.error('Pagination search error:', error);
      res.status(500).json({ 
        message: 'Failed to search tractors',
        error: error.message 
      });
    }
  }
};

module.exports = tractorController;