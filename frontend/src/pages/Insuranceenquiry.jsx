import React, { useState } from 'react';
import api from '../../services/Api';
// import './InsuranceEnquiry.css';

const InsuranceEnquiry = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    tractorModel: '',
    purchaseYear: '',
    currentInsurer: '',
    policyExpiry: '',
    claimHistory: 'NO'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/insurance/enquiry', formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        tractorModel: '',
        purchaseYear: '',
        currentInsurer: '',
        policyExpiry: '',
        claimHistory: 'NO'
      });
    } catch (error) {
      console.error('Error submitting insurance enquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="insurance-enquiry">
      <h2>Insurance Enquiry</h2>
      {success ? (
        <div className="success-message">
          Thank you for your enquiry! Our team will contact you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tractor Model</label>
            <input
              type="text"
              name="tractorModel"
              value={formData.tractorModel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Purchase Year</label>
            <input
              type="number"
              name="purchaseYear"
              value={formData.purchaseYear}
              onChange={handleChange}
              min="1990"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div className="form-group">
            <label>Current Insurer (if any)</label>
            <input
              type="text"
              name="currentInsurer"
              value={formData.currentInsurer}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Policy Expiry Date</label>
            <input
              type="date"
              name="policyExpiry"
              value={formData.policyExpiry}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Any Previous Claims?</label>
            <select
              name="claimHistory"
              value={formData.claimHistory}
              onChange={handleChange}
            >
              <option value="NO">No</option>
              <option value="YES">Yes</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
      )}
    </div>
  );
};

export default InsuranceEnquiry;