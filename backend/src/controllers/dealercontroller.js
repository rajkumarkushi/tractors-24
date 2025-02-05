const { db } = require('../config/firebase');

const dealerController = {
  async registerDealer(req, res) {
    try {
      const {
        businessName,
        gstNumber,
        address,
        dealershipType,
        brands,
        documents
      } = req.body;

      const dealerData = {
        userId: req.user.uid,
        businessName,
        gstNumber,
        address,
        dealershipType,
        brands,
        documents,
        status: 'PENDING',
        margin: 0,
        ratings: [],
        averageRating: 0,
        createdAt: new Date().toISOString()
      };

      await db.collection('dealers').doc(req.user.uid).set(dealerData);
      res.status(201).json({ message: 'Dealer registration submitted for approval' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getDealerListings(req, res) {
    try {
      const snapshot = await db.collection('tractors')
        .where('sellerId', '==', req.user.uid)
        .where('sellerType', '==', 'DEALER')
        .get();

      const listings = [];
      snapshot.forEach(doc => {
        listings.push({ id: doc.id, ...doc.data() });
      });

      res.json(listings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateDealerMargin(req, res) {
    try {
      const { margin } = req.body;
      
      await db.collection('dealers').doc(req.user.uid).update({
        margin: parseFloat(margin)
      });

      res.json({ message: 'Dealer margin updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = dealerController;