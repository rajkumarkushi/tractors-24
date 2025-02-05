import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../services/format';
import './TractorCard.css';

const TractorCard = ({ tractor }) => {
  return (
    <div className="tractor-card">
      <img 
        src={tractor.images[0]} 
        alt={tractor.title}
        className="tractor-image"
      />
      <div className="tractor-info">
        <h3>{tractor.title}</h3>
        <p className="price">{formatCurrency(tractor.price)}</p>
        <div className="specs">
          <span>{tractor.brand}</span>
          <span>{tractor.year}</span>
          <span>{tractor.specifications.horsepower} HP</span>
        </div>
        <div className="location">
          <i className="fas fa-map-marker-alt"></i>
          {tractor.location.city}, {tractor.location.state}
        </div>
        <Link to={`/tractors/${tractor.id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TractorCard;