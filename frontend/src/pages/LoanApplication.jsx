import React, { useState } from 'react';
import api from '../../config/axios';
import './LoanApplication.css';

const LoanApplication = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    panCard: '',
    address: '',
    
    // Employment Details
    employmentType: '',
    monthlyIncome: '',
    occupation: '',
    
    // Loan Details
    loanAmount: '',
    tenure: '',
    tractorModel: '',
    dealership: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/loan/apply', formData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="form-step">
            <h3>Personal Information</h3>
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
            {/* Add other personal information fields */}
            <button onClick={() => setStep(2)}>Next</button>
          </div>
        );
      
      case 2:
        return (
          <div className="form-step">
            <h3>Employment Details</h3>
            {/* Add employment detail fields */}
            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={() => setStep(3)}>Next</button>
          </div>
        );
      
      case 3:
        return (
          <div className="form-step">
            <h3>Loan Details</h3>
            {/* Add loan detail fields */}
            <button onClick={() => setStep(2)}>Back</button>
            <button onClick={handleSubmit}>Submit Application</button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="loan-application">
      <h2>Tractor Loan Application</h2>
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          Personal Details
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          Employment
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          Loan Details
        </div>
      </div>
      <form className="loan-form">
        {renderStep()}
      </form>
    </div>
  );
};

export default LoanApplication;