import React, { useState, useEffect } from 'react';
import api from '../../services/axios';
import { formatCurrency } from '../../services/format';
import './Wallet.css';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const { data } = await api.get('/wallet');
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMoney = async (amount) => {
    try {
      const { data } = await api.post('/wallet/add', { amount });
      setBalance(data.newBalance);
      setTransactions([data.transaction, ...transactions]);
    } catch (error) {
      console.error('Error adding money:', error);
    }
  };

  return (
    <div className="wallet-page">
      <div className="wallet-balance">
        <h2>Your Wallet</h2>
        <div className="balance-amount">
          {formatCurrency(balance)}
        </div>
        <button onClick={() => addMoney(1000)} className="add-money-btn">
          Add Money
        </button>
      </div>

      <div className="transactions-section">
        <h3>Transaction History</h3>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="transactions-list">
            {transactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <span className="transaction-type">
                    {transaction.type}
                  </span>
                  <span className="transaction-date">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <span className={`transaction-amount ${
                  transaction.type === 'CREDIT' ? 'credit' : 'debit'
                }`}>
                  {transaction.type === 'CREDIT' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;