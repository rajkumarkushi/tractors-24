const { db } = require('../config/firebase');

const searchController = {
  async searchByLocation(req, res) {
    try {
      const { latitude, longitude, radius, filters } = req.query;
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const rad = parseFloat(radius) || 50; // Default 50km radius

      // Create a GeoPoint
      const center = new admin.firestore.GeoPoint(lat, lon);

      // Get boundaries
      const bounds = getBoundingBox(lat, lon, rad);

      let query = db.collection('tractors')
        .where('status', '==', 'ACTIVE')
        .where('location.latitude', '>=', bounds.minLat)
        .where('location.latitude', '<=', bounds.maxLat);

      if (filters) {
        if (filters.priceRange) {
          query = query.where('price', '>=', filters.priceRange.min)
                      .where('price', '<=', filters.priceRange.max);
        }
        if (filters.brand) {
          query = query.where('brand', '==', filters.brand);
        }
      }

      const snapshot = await query.get();
      const tractors = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        const distance = calculateDistance(
          lat,
          lon,
          data.location.latitude,
          data.location.longitude
        );

        if (distance <= rad) {
          tractors.push({
            id: doc.id,
            ...data,
            distance: Math.round(distance * 10) / 10
          });
        }
      });

      // Sort by distance
      tractors.sort((a, b) => a.distance - b.distance);

      res.json(tractors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Helper functions for geolocation calculations
function getBoundingBox(latitude, longitude, distance) {
  const R = 6371; // Earth's radius in km
  const lat = latitude * Math.PI / 180;
  const lon = longitude * Math.PI / 180;
  const d = distance / R;

  return {
    minLat: ((lat - d) * 180 / Math.PI),
    maxLat: ((lat + d) * 180 / Math.PI),
    minLon: ((lon - d / Math.cos(lat)) * 180 / Math.PI),
    maxLon: ((lon + d / Math.cos(lat)) * 180 / Math.PI)
  };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

module.exports = searchController;