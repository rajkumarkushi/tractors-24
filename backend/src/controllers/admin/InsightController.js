const { db } = require('../firebaseconfig');

// Initialize sample data if needed
const initializeInsightsData = async () => {
  try {
    const statsRef = db.collection('statistics');
    const statsDoc = await statsRef.doc('overview').get();

    if (!statsDoc.exists) {
      // Initialize with sample data
      await statsRef.doc('overview').set({
        totalRevenue: 25000,
        revenueGrowth: 15,
        activeMembers: 280,
        memberGrowth: 12,
        lastUpdated: new Date()
      });

      // Initialize profit data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const profitData = months.map((month, index) => ({
        month,
        profit: 15000 + (index * 2000),
        timestamp: new Date(2024, index, 1)
      }));

      for (const data of profitData) {
        await db.collection('profits').add(data);
      }

      // Initialize membership data
      const membershipData = months.map((month, index) => ({
        month,
        current: 150 + (index * 30),
        previous: 120 + (index * 20),
        timestamp: new Date(2024, index, 1)
      }));

      for (const data of membershipData) {
        await db.collection('memberships').add(data);
      }

      // Initialize sales data
      const salesData = months.map((month, index) => ({
        month,
        sales: 12000 + (index * 3000),
        timestamp: new Date(2024, index, 1)
      }));

      for (const data of salesData) {
        await db.collection('sales').add(data);
      }

      // Initialize new members distribution
      await db.collection('memberDistribution').doc('current').set({
        walkIn: 30,
        referral: 25,
        online: 45,
        timestamp: new Date()
      });
    }
  } catch (error) {
    console.error('Error initializing insights data:', error);
  }
};

// Get quick stats
const getQuickStats = async (req, res) => {
  try {
    const statsDoc = await db.collection('statistics').doc('overview').get();
    
    if (!statsDoc.exists) {
      throw new Error('Stats not found');
    }

    res.status(200).json(statsDoc.data());
  } catch (error) {
    console.error('Error fetching quick stats:', error);
    res.status(500).json({ error: 'Failed to fetch quick stats' });
  }
};

// Get profit data
const getProfitData = async (req, res) => {
  try {
    const profitsSnapshot = await db.collection('profits')
      .orderBy('timestamp')
      .limit(6)
      .get();

    const profitData = profitsSnapshot.docs.map(doc => ({
      month: doc.data().month,
      profit: doc.data().profit
    }));

    res.status(200).json(profitData);
  } catch (error) {
    console.error('Error fetching profit data:', error);
    res.status(500).json({ error: 'Failed to fetch profit data' });
  }
};

// Get membership data
const getMembershipData = async (req, res) => {
  try {
    const membershipSnapshot = await db.collection('memberships')
      .orderBy('timestamp')
      .limit(6)
      .get();

    const membershipData = membershipSnapshot.docs.map(doc => ({
      month: doc.data().month,
      current: doc.data().current,
      previous: doc.data().previous
    }));

    res.status(200).json(membershipData);
  } catch (error) {
    console.error('Error fetching membership data:', error);
    res.status(500).json({ error: 'Failed to fetch membership data' });
  }
};

// Get sales data
const getSalesData = async (req, res) => {
  try {
    const { period } = req.query;
    let salesQuery = db.collection('sales');

    if (period === 'annually') {
      salesQuery = salesQuery.where('type', '==', 'annual');
    } else {
      salesQuery = salesQuery.orderBy('timestamp').limit(6);
    }

    const salesSnapshot = await salesQuery.get();
    const salesData = salesSnapshot.docs.map(doc => ({
      name: doc.data().month || doc.data().year,
      sales: doc.data().sales
    }));

    res.status(200).json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
};

// Get new members distribution
const getMemberDistribution = async (req, res) => {
  try {
    const distributionDoc = await db.collection('memberDistribution')
      .doc('current')
      .get();

    if (!distributionDoc.exists) {
      throw new Error('Member distribution data not found');
    }

    const data = distributionDoc.data();
    const distribution = [
      { name: 'Walk-in', value: data.walkIn },
      { name: 'Referral', value: data.referral },
      { name: 'Online', value: data.online }
    ];

    res.status(200).json(distribution);
  } catch (error) {
    console.error('Error fetching member distribution:', error);
    res.status(500).json({ error: 'Failed to fetch member distribution' });
  }
};

// Initialize data when module is loaded
initializeInsightsData();

module.exports = {
  getQuickStats,
  getProfitData,
  getMembershipData,
  getSalesData,
  getMemberDistribution
};