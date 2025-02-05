const { db } = require('../config/firebase');

const showroomController = {
  async registerShowroom(req, res) {
    try {
      const {
        name,
        address,
        contactPerson,
        phone,
        email,
        brands,
        services,
        workingHours,
        images
      } = req.body;

      const showroomData = {
        name,
        address,
        contactPerson,
        phone,
        email,
        brands,
        services,
        workingHours,
        images,
        ownerId: req.user.uid,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        location: new admin.firestore.GeoPoint(
          address.latitude,
          address.longitude
        )
      };

      await db.collection('showrooms').add(showroomData);
      res.status(201).json({ message: 'Showroom registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async searchShowrooms(req, res) {
    try {
      const { latitude, longitude, radius, brand } = req.query;
      
      let query = db.collection('showrooms')
        .where('status', '==', 'ACTIVE');

      if (brand) {
        query = query.where('brands', 'array-contains', brand);
      }

      const snapshot = await query.get();
      const showrooms = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        if (latitude && longitude) {
          const distance = calculateDistance(
            parseFloat(latitude),
            parseFloat(longitude),
            data.location.latitude,
            data.location.longitude
          );
          
          if (distance <= parseFloat(radius || 50)) {
            showrooms.push({
              id: doc.id,
              ...data,
              distance: Math.round(distance * 10) / 10
            });
          }
        } else {
          showrooms.push({ id: doc.id, ...data });
        }
      });

      res.json(showrooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = showroomController;