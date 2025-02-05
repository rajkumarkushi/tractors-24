const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

const referralController = {
  // Generate referral code for user
  async generateReferralCode(req, res) {
    try {
      const userId = req.body.uid;
      const code = uuidv4().toUpperCase();

      await db.collection('referral_codes').doc(userId).set({
        code,
        userId,
        createdAt: new Date().toISOString(),
        isActive: true
      });

      res.json({ code });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Apply referral code during registration
  async applyReferralCode(req, res) {
    try {
      const { code, refereeId } = req.body;

      // Verify referral code
      const referralCodeDoc = await db.collection('referral_codes')
        .where('code', '==', code)
        .where('isActive', '==', true)
        .get();

      if (referralCodeDoc.empty) {
        return res.status(400).json({ message: 'Invalid referral code' });
      }

      const referrerId = referralCodeDoc.docs[0].data().userId;

      // Create referral record
      const referralData = {
        referrerId,
        refereeId,
        code,
        status: 'pending',
        rewardStatus: 'pending',
        createdAt: new Date().toISOString()
      };

      await db.collection('referrals').add(referralData);

      res.json({ message: 'Referral code applied successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get referral statistics
  async getReferralStats(req, res) {
    try {
      const userId = req.user.uid;

      // Get referral code
      const codeDoc = await db.collection('referral_codes')
        .doc(userId)
        .get();

      // Get referrals made
      const referralsSnapshot = await db.collection('referrals')
        .where('referrerId', '==', userId)
        .get();

      // Get rewards
      const rewardsSnapshot = await db.collection('rewards')
        .where('userId', '==', userId)
        .get();

      const stats = {
        referralCode: codeDoc.exists ? codeDoc.data().code : null,
        totalReferrals: referralsSnapshot.size,
        successfulReferrals: 0,
        pendingReferrals: 0,
        totalRewards: 0
      };

      referralsSnapshot.forEach(doc => {
        const referral = doc.data();
        if (referral.status === 'successful') {
          stats.successfulReferrals++;
        } else if (referral.status === 'pending') {
          stats.pendingReferrals++;
        }
      });

      rewardsSnapshot.forEach(doc => {
        const reward = doc.data();
        if (reward.status === 'credited') {
          stats.totalRewards += reward.amount;
        }
      });

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Process successful referral
  async processReferral(req, res) {
    try {
      const { referralId } = req.body;
      
      const referralDoc = await db.collection('referrals').doc(referralId).get();
      const referral = referralDoc.data();

      // Update referral status
      await db.collection('referrals').doc(referralId).update({
        status: 'successful',
        completedAt: new Date().toISOString()
      });

      // Create rewards
      const referrerReward = {
        userId: referral.referrerId,
        type: 'referrer',
        amount: 500, // ₹500 for referrer
        status: 'pending',
        referralId,
        createdAt: new Date().toISOString()
      };

      const refereeReward = {
        userId: referral.refereeId,
        type: 'referee',
        amount: 200, // ₹200 for referee
        status: 'pending',
        referralId,
        createdAt: new Date().toISOString()
      };

      await Promise.all([
        db.collection('rewards').add(referrerReward),
        db.collection('rewards').add(refereeReward)
      ]);

      res.json({ message: 'Referral processed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = referralController;