const axios = require('axios');
const { db } = require('../config/firebase');

const CIBIL_API_KEY = process.env.CIBIL_API_KEY;
const CIBIL_BASE_URL = process.env.CIBIL_BASE_URL;

const cibilController = {
  async checkCibilScore(req, res) {
    try {
      const { pan, dob, consent } = req.body;

      if (!consent) {
        return res.status(400).json({ message: 'User consent is required' });
      }

      const response = await axios.post(`${CIBIL_BASE_URL}/check-score`, {
        pan,
        dateOfBirth: dob
      }, {
        headers: { 'Authorization': `Bearer ${CIBIL_API_KEY}` }
      });

      // Store CIBIL check history
      await db.collection('cibilChecks').add({
        userId: req.user.uid,
        pan,
        score: response.data.score,
        timestamp: new Date().toISOString()
      });

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error checking CIBIL score' });
    }
  }
};

module.exports = cibilController;