import React from 'react';
import StockCard from './StockCard';

const StockList = ({ tractors, loading, onStockUpdate }) => {
  if (loading) {
    return <div className="loading">Loading tractors...</div>;
  }

  return (
    <div className="stock-list">
      <h2>Current Stock</h2>
      <div className="tractors-grid">
        {tractors.length === 0 ? (
          <p>No tractors in stock</p>
        ) : (
          tractors.map((tractor) => (
            <StockCard 
              key={tractor.id} 
              tractor={tractor} 
              onStockUpdate={onStockUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StockList;