const { db } = require('../firebaseconfig');

// Initialize sample data if needed
const initializeInvoiceData = async () => {
  try {
    const statsRef = db.collection('invoiceStats').doc('overview');
    const statsDoc = await statsRef.get();

    if (!statsDoc.exists) {
      // Initialize with sample data
      await statsRef.set({
        totalInvoices: 150,
        paidInvoices: 120,
        pendingInvoices: 25,
        overdueInvoices: 5,
        totalAmount: 25000,
        paidAmount: 20000,
        lastUpdated: new Date()
      });

      // Initialize recent invoices
      const recentInvoices = [
        {
          id: 'INV-2024-001',
          client: {
            name: 'John Doe',
            avatar: 'https://example.com/avatar1.jpg',
            email: 'john@example.com',
          },
          amount: 500,
          date: '2024-02-15',
          dueDate: '2024-03-15',
          status: 'paid',
          type: 'Membership',
        },
        // Add more invoices as needed
      ];

      for (const invoice of recentInvoices) {
        await db.collection('invoices').add(invoice);
      }

      // Initialize monthly revenue
      const monthlyRevenue = [
        { month: 'Jan', amount: 15000 },
        { month: 'Feb', amount: 18000 },
        { month: 'Mar', amount: 16000 },
        { month: 'Apr', amount: 20000 },
        { month: 'May', amount: 22000 },
        { month: 'Jun', amount: 25000 },
      ];

      for (const revenue of monthlyRevenue) {
        await db.collection('monthlyRevenue').add(revenue);
      }
    }
  } catch (error) {
    console.error('Error initializing invoice data:', error);
  }
};

// Get invoice statistics
const getInvoiceStats = async (req, res) => {
  try {
    const statsDoc = await db.collection('invoiceStats').doc('overview').get();
    
    if (!statsDoc.exists) {
      throw new Error('Invoice stats not found');
    }

    res.status(200).json(statsDoc.data());
  } catch (error) {
    console.error('Error fetching invoice stats:', error);
    res.status(500).json({ error: 'Failed to fetch invoice stats' });
  }
};

// Get recent invoices
const getRecentInvoices = async (req, res) => {
  try {
    const invoicesSnapshot = await db.collection('invoices')
      .orderBy('date', 'desc')
      .limit(10)
      .get();

    const invoices = invoicesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching recent invoices:', error);
    res.status(500).json({ error: 'Failed to fetch recent invoices' });
  }
};

// Get monthly revenue
const getMonthlyRevenue = async (req, res) => {
  try {
    const revenueSnapshot = await db.collection('monthlyRevenue')
      .orderBy('month')
      .get();

    const revenue = revenueSnapshot.docs.map(doc => doc.data());

    res.status(200).json(revenue);
  } catch (error) {
    console.error('Error fetching monthly revenue:', error);
    res.status(500).json({ error: 'Failed to fetch monthly revenue' });
  }
};

// Initialize data when module is loaded
initializeInvoiceData();

module.exports = {
  getInvoiceStats,
  getRecentInvoices,
  getMonthlyRevenue
};