const { db } = require('../config/firebase');
const admin = require('firebase-admin');

const mobileController = {
  async checkVersion(req, res) {
    try {
      const { platform } = req.query;
      const versionDoc = await db.collection('appVersions')
        .doc(platform)
        .get();

      res.json(versionDoc.data());
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateFCMToken(req, res) {
    try {
      const { token } = req.body;
      
      await db.collection('users').doc(req.user.uid).update({
        fcmToken: token,
        lastTokenUpdate: new Date().toISOString()
      });

      res.json({ message: 'Token updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getNotifications(req, res) {
    try {
      const snapshot = await db.collection('notifications')
        .where('userId', '==', req.user.uid)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();

      const notifications = [];
      snapshot.forEach(doc => {
        notifications.push({ id: doc.id, ...doc.data() });
      });

      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getFavorites(req, res) {
    try {
      const userDoc = await db.collection('users')
        .doc(req.user.uid)
        .get();

      const favorites = userDoc.data().favorites || [];
      
      // Get tractor details for favorites
      const tractors = await Promise.all(
        favorites.map(async (tractorId) => {
          const tractorDoc = await db.collection('tractors')
            .doc(tractorId)
            .get();
          return { id: tractorDoc.id, ...tractorDoc.data() };
        })
      );

      res.json(tractors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = mobileController;