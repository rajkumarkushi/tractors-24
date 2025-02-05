import React from 'react';
import api from '../../services/axios';

const StockCard = ({ tractor, onStockUpdate }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tractor?')) {
      try {
        await api.delete(`/stock/delete/${tractor.id}`);
        onStockUpdate();
      } catch (error) {
        console.error('Error deleting tractor:', error);
      }
    }
  };

  return (
    <div className="tractor-card">
      <h3>{tractor.brand} {tractor.model}</h3>
      <div className="tractor-details">
        <p><strong>Price:</strong> ₹{tractor.price.toLocaleString()}</p>
        <p><strong>Quantity:</strong> {tractor.quantity}</p>
        <p><strong>Horse Power:</strong> {tractor.horsePower}</p>
        <p><strong>Year:</strong> {tractor.manufacturingYear}</p>
      </div>
      <div className="card-actions">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StockCard;