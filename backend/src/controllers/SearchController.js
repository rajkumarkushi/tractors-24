// backend/controllers/searchController.js
const { db } = require('../config/firebase');

  const  searchTractors = async(req, res)=> {
    try {
      const { type, hpRange, brand, state } = req.body;

      // Start with the tractors collection reference
      let query = db.collection('tractors');

      // Add filters based on search criteria
      if (type) {
        query = query.where('condition', '==', type);
      }

      if (brand) {
        query = query.where('brand', '==', brand);
      }

      if (state) {
        query = query.where('state', '==', state);
      }

      // Get the documents
      const snapshot = await query.get();

      // Process results
      let tractors = [];
      snapshot.forEach(doc => {
        const tractor = { id: doc.id, ...doc.data() };
        
        // Handle HP range filtering (needs to be done in memory since Firestore doesn't support range queries on multiple fields)
        if (hpRange) {
          const [minHp, maxHp] = hpRange.split('-').map(Number);
          const tractorHp = Number(tractor.horsePower);
          
          if (maxHp) {
            if (tractorHp >= minHp && tractorHp <= maxHp) {
              tractors.push(tractor);
            }
          } else if (tractorHp >= minHp) {
            tractors.push(tractor);
          }
        } else {
          tractors.push(tractor);
        }
      });

      // Sort by createdAt
      tractors.sort((a, b) => b.createdAt - a.createdAt);

      res.json({
        success: true,
        count: tractors.length,
        tractors
      });

    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({
        success: false,
        message: 'Error searching tractors'
      });
    }
  };

module.exports = {searchTractors};