import React, { useState } from 'react';
import api from '../../config/axios';
import './RTOVerification.css';

const RTOVerification = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get(`/rto/verify/${vehicleNumber}`);
      setVehicleInfo(data);
    } catch (error) {
      setError('Failed to verify vehicle. Please check the number and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rto-verification">
      <h2>RTO Verification</h2>
      <form onSubmit={handleVerification}>
        <div className="form-group">
          <label>Vehicle Registration Number</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            placeholder="Enter vehicle number"
            pattern="^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Vehicle'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {vehicleInfo && (
        <div className="vehicle-info">
          <h3>Vehicle Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Registration Number</label>
              <span>{vehicleInfo.registrationNumber}</span>
            </div>
            <div className="info-item">
              <label>Owner Name</label>
              <span>{vehicleInfo.ownerName}</span>
            </div>
            <div className="info-item">
              <label>Vehicle Class</label>
              <span>{vehicleInfo.vehicleClass}</span>
            </div>
            <div className="info-item">
              <label>Manufacturer</label>
              <span>{vehicleInfo.manufacturer}</span>
            </div>
            <div className="info-item">
              <label>Model</label>
              <span>{vehicleInfo.model}</span>
            </div>
            <div className="info-item">
              <label>Registration Date</label>
              <span>{new Date(vehicleInfo.registrationDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RTOVerification;