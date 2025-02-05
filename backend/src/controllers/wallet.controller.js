const { db } = require('../config/firebase');
const admin = require('firebase-admin');

const walletController = {
  async getBalance(req, res) {
    try {
      const userDoc = await db.collection('users').doc(req.user.uid).get();
      const userData = userDoc.data();
      
      res.json({
        balance: userData.wallet.balance,
        transactions: userData.wallet.transactions
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async addMoney(req, res) {
    try {
      const { amount, paymentId } = req.body;
      
      // Start a Firestore transaction
      await db.runTransaction(async (transaction) => {
        const userRef = db.collection('users').doc(req.user.uid);
        const userDoc = await transaction.get(userRef);
        const userData = userDoc.data();

        const newTransaction = {
          type: 'CREDIT',
          amount: parseFloat(amount),
          description: 'Wallet top-up',
          paymentId,
          timestamp: new Date().toISOString()
        };

        transaction.update(userRef, {
          'wallet.balance': userData.wallet.balance + parseFloat(amount),
          'wallet.transactions': admin.firestore.FieldValue.arrayUnion(newTransaction)
        });
      });

      res.json({ message: 'Wallet updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async transferMoney(req, res) {
    try {
      const { receiverId, amount, description } = req.body;

      await db.runTransaction(async (transaction) => {
        const senderRef = db.collection('users').doc(req.user.uid);
        const receiverRef = db.collection('users').doc(receiverId);

        const [senderDoc, receiverDoc] = await Promise.all([
          transaction.get(senderRef),
          transaction.get(receiverRef)
        ]);

        if (senderDoc.data().wallet.balance < amount) {
          throw new Error('Insufficient balance');
        }

        const transferTransaction = {
          type: 'TRANSFER',
          amount: parseFloat(amount),
          description,
          timestamp: new Date().toISOString()
        };

        transaction.update(senderRef, {
          'wallet.balance': senderDoc.data().wallet.balance - parseFloat(amount),
          'wallet.transactions': admin.firestore.FieldValue.arrayUnion({
            ...transferTransaction,
            direction: 'OUT',
            partnerId: receiverId
          })
        });

        transaction.update(receiverRef, {
          'wallet.balance': receiverDoc.data().wallet.balance + parseFloat(amount),
          'wallet.transactions': admin.firestore.FieldValue.arrayUnion({
            ...transferTransaction,
            direction: 'IN',
            partnerId: req.user.uid
          })
        });
      });

      res.json({ message: 'Transfer successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = walletController;