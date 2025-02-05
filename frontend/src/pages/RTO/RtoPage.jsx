// import React, { useState } from 'react';
// import api from '../../services/axios';
// import './RtoPage.css'; // Assuming custom styles.

// const RtoPage = ({ onRtoUpdate }) => {
//   const [formData, setFormData] = useState({
//     registrationNumber: '',
//     registrationDate: '',
//     ownerName: '',
//     vehicleClass: '',
//     fuelType: '',
//     makerModel: '',
//     fitnessUpto: '',
//     insuranceUpto: '',
//     fuelNorms: '',
//     financierName: '',
//     pucUpto: '',
//     roadTaxPaidUpto: '',
//     vehicleColor: '',
//     seatCapacity: '',
//     unloadWeight: '',
//     bodyTypeDesc: '',
//     manufactureMonthYear: '',
//     rcStatus: '',
//     ownershipDesc: '',
//     rtoOffice: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFetchDetails = async () => {
//     if (!formData.registrationNumber.trim()) {
//       setError('Please enter a valid registration number.');
//       return;
//     }
//     try {
//       setFetching(true);
//       setError(null);
//       const response = await api.post('/search_vehicle', {
//         registrationNumber: formData.registrationNumber,
//       });
//       const details = response.data?.details;
//       if (details) {
//         setFormData({
//           registrationNumber: details.registrationNo || '',
//           registrationDate: details.registrationDate || '',
//           ownerName: details.ownerName || '',
//           vehicleClass: details.vehicleClass || '',
//           fuelType: details.fuelType || '',
//           makerModel: details.makerModel || '',
//           fitnessUpto: details.fitnessUpto || '',
//           insuranceUpto: details.insuranceUpto || '',
//           fuelNorms: details.fuelNorms || '',
//           financierName: details.financierName || '',
//           pucUpto: details.pucUpto || '',
//           roadTaxPaidUpto: details.roadTaxPaidUpto || '',
//           vehicleColor: details.vehicleColor || '',
//           seatCapacity: details.seatCapacity || '',
//           unloadWeight: details.unloadWeight || '',
//           bodyTypeDesc: details.bodyTypeDesc || '',
//           manufactureMonthYear: details.manufactureMonthYear || '',
//           rcStatus: details.rcStatus || '',
//           ownershipDesc: details.ownershipDesc || '',
//           rtoOffice: details.registrationAuthority || '',
//         });
//       } else {
//         setError('No details found for the entered registration number.');
//       }
//     } catch (err) {
//       setError('Failed to fetch vehicle details. Please try again.');
//       console.error('Error fetching vehicle details:', err);
//     } finally {
//       setFetching(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await api.post('/rto/add', formData);
//       setFormData({
//         registrationNumber: '',
//         registrationDate: '',
//         ownerName: '',
//         vehicleClass: '',
//         fuelType: '',
//         makerModel: '',
//         fitnessUpto: '',
//         insuranceUpto: '',
//         fuelNorms: '',
//         financierName: '',
//         pucUpto: '',
//         roadTaxPaidUpto: '',
//         vehicleColor: '',
//         seatCapacity: '',
//         unloadWeight: '',
//         bodyTypeDesc: '',
//         manufactureMonthYear: '',
//         rcStatus: '',
//         ownershipDesc: '',
//         rtoOffice: '',
//       });
//       onRtoUpdate();
//       setError(null);
//     } catch (err) {
//       setError('Failed to add RTO record. Please try again.');
//       console.error('Error adding RTO record:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rto-form-container">
//       <h2>RTO Management</h2>
//       <p className="form-description">
//         Enter the registration number to fetch vehicle details or manually fill in the required fields.
//       </p>

//       {error && <div className="error-message">{error}</div>}

//       <form onSubmit={handleSubmit} className="rto-form">
//         <div className="form-group">
//           <label htmlFor="registrationNumber">Registration Number</label>
//           <div className="input-with-button">
//             <input
//               type="text"
//               id="registrationNumber"
//               name="registrationNumber"
//               value={formData.registrationNumber}
//               onChange={handleChange}
//               placeholder="Enter Registration Number"
//               required
//             />
//             <button
//               type="button"
//               onClick={handleFetchDetails}
//               disabled={fetching}
//               className="fetch-button"
//             >
//               {fetching ? 'Fetching...' : 'Fetch Details'}
//             </button>
//           </div>
//         </div>

//         {[
//           { name: 'ownerName', label: 'Owner Name' },
//           { name: 'vehicleClass', label: 'Vehicle Class' },
//           { name: 'fuelType', label: 'Fuel Type' },
//           { name: 'makerModel', label: 'Maker Model' },
//           { name: 'fitnessUpto', label: 'Fitness Upto' },
//           { name: 'insuranceUpto', label: 'Insurance Upto' },
//           { name: 'fuelNorms', label: 'Fuel Norms' },
//           { name: 'financierName', label: 'Financier Name' },
//           { name: 'pucUpto', label: 'PUC Upto' },
//           { name: 'roadTaxPaidUpto', label: 'Road Tax Paid Upto' },
//           { name: 'vehicleColor', label: 'Vehicle Color' },
//           { name: 'seatCapacity', label: 'Seat Capacity' },
//           { name: 'unloadWeight', label: 'Unload Weight' },
//           { name: 'bodyTypeDesc', label: 'Body Type Description' },
//           { name: 'manufactureMonthYear', label: 'Manufacture Month/Year' },
//           { name: 'rcStatus', label: 'RC Status' },
//           { name: 'ownership', label: 'Ownership' },
//           { name: 'ownershipDesc', label: 'Ownership Description' },
//           { name: 'rtoOffice', label: 'RTO Office' },
//         ].map((field) => (
//           <div className="form-group" key={field.name}>
//             <label htmlFor={field.name}>{field.label}</label>
//             <input
//               type="text"
//               id={field.name}
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.label}
//               required
//               readOnly={fetching}
//             />
//           </div>
//         ))}

//         <button type="submit" disabled={loading || fetching} className="submit-button">
//           {loading ? 'Submitting...' : 'Add RTO Record'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RtoPage;
import React, { useState } from 'react';
import api from '../../services/axios';
import './RtoPage.css';

const RtoPage = ({ onRtoUpdate }) => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    registrationDate: '',
    ownerName: '',
    vehicleClass: '',
    fuelType: '',
    makerModel: '',
    fitnessUpto: '',
    insuranceUpto: '',
    fuelNorms: '',
    financierName: '',
    pucUpto: '',
    roadTaxPaidUpto: '',
    vehicleColor: '',
    seatCapacity: '',
    unloadWeight: '',
    bodyTypeDesc: '',
    manufactureMonthYear: '',
    rcStatus: '',
    ownershipDesc: '',
    rtoOffice: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccessMessage('');
  };

  const handleFetchDetails = async () => {
    if (!formData.registrationNumber.trim()) {
      setError('Please enter a valid registration number.');
      return;
    }

    try {
      setFetching(true);
      setError(null);
      setSuccessMessage('');
      
      // Make sure this URL matches your backend route
      const response = await api.post('http://localhost:5000/api/rto/vehicle-info', {
        registrationNumber: formData.registrationNumber,
      });

      const details = response.data?.details;
      if (details) {
        setFormData({
          registrationNumber: details.registrationNo || '',
          registrationDate: details.registrationDate || '',
          ownerName: details.ownerName || '',
          vehicleClass: details.vehicleClass || '',
          fuelType: details.fuelType || '',
          makerModel: details.makerModel || '',
          fitnessUpto: details.fitnessUpto || '',
          insuranceUpto: details.insuranceUpto || '',
          fuelNorms: details.fuelNorms || '',
          financierName: details.financierName || '',
          pucUpto: details.pucUpto || '',
          roadTaxPaidUpto: details.roadTaxPaidUpto || '',
          vehicleColor: details.vehicleColor || '',
          seatCapacity: details.seatCapacity || '',
          unloadWeight: details.unloadWeight || '',
          bodyTypeDesc: details.bodyTypeDesc || '',
          manufactureMonthYear: details.manufactureMonthYear || '',
          rcStatus: details.rcStatus || '',
          ownershipDesc: details.ownershipDesc || '',
          rtoOffice: details.registrationAuthority || '',
        });
        setSuccessMessage('Vehicle details fetched successfully!');
      } else {
        setError('No details found for the entered registration number.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch vehicle details. Please try again.');
      console.error('Error fetching vehicle details:', err);
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setFormData({
      registrationNumber: '',
      registrationDate: '',
      ownerName: '',
      vehicleClass: '',
      fuelType: '',
      makerModel: '',
      fitnessUpto: '',
      insuranceUpto: '',
      fuelNorms: '',
      financierName: '',
      pucUpto: '',
      roadTaxPaidUpto: '',
      vehicleColor: '',
      seatCapacity: '',
      unloadWeight: '',
      bodyTypeDesc: '',
      manufactureMonthYear: '',
      rcStatus: '',
      ownershipDesc: '',
      rtoOffice: '',
    });
    setError(null);
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage('');

      // Make sure this URL matches your backend route
      await api.post('/rto/add-record', formData);
      
      setSuccessMessage('RTO record added successfully!');
      onRtoUpdate?.(); // Optional chaining in case onRtoUpdate is not provided
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add RTO record. Please try again.');
      console.error('Error adding RTO record:', err);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: 'registrationNumber', label: 'Registration Number', required: true },
    { name: 'registrationDate', label: 'Registration Date', type: 'date' },
    { name: 'ownerName', label: 'Owner Name', required: true },
    { name: 'vehicleClass', label: 'Vehicle Class' },
    { name: 'fuelType', label: 'Fuel Type' },
    { name: 'makerModel', label: 'Maker Model' },
    { name: 'fitnessUpto', label: 'Fitness Upto', type: 'date' },
    { name: 'insuranceUpto', label: 'Insurance Upto', type: 'date' },
    { name: 'fuelNorms', label: 'Fuel Norms' },
    { name: 'financierName', label: 'Financier Name' },
    { name: 'pucUpto', label: 'PUC Upto', type: 'date' },
    { name: 'roadTaxPaidUpto', label: 'Road Tax Paid Upto', type: 'date' },
    { name: 'vehicleColor', label: 'Vehicle Color' },
    { name: 'seatCapacity', label: 'Seat Capacity', type: 'number' },
    { name: 'unloadWeight', label: 'Unload Weight' },
    { name: 'bodyTypeDesc', label: 'Body Type Description' },
    { name: 'manufactureMonthYear', label: 'Manufacture Month/Year' },
    { name: 'rcStatus', label: 'RC Status' },
    { name: 'ownershipDesc', label: 'Ownership Description' },
    { name: 'rtoOffice', label: 'RTO Office' }
  ];

  return (
    <div className="rto-form-container">
      <h2>RTO Management</h2>
      <p className="form-description">
        Enter the registration number to fetch vehicle details or manually fill in the required fields.
      </p>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="rto-form">
        <div className="form-group">
          <label htmlFor="registrationNumber">Registration Number *</label>
          <div className="input-with-button">
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Enter Registration Number"
              required
              className={error ? 'error' : ''}
            />
            <button
              type="button"
              onClick={handleFetchDetails}
              disabled={fetching}
              style={{
                backgroundColor: '#116978',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#0e5254'
                },'&:disabled': {
                  backgroundColor: '#ccc',
                  cursor: 'not-allowed'
                }
              }}
            >
              {fetching ? 'Fetching...' : 'Fetch Details'}
            </button>
          </div>
        </div>


        {formFields.slice(1).map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>
              {field.label} {field.required && '*'}
            </label>
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={`Enter ${field.label}`}
              required={field.required}
              disabled={fetching}
              className={error ? 'error' : ''}
            />
          </div>
        ))}

       <div className="form-buttons">
          <button 
            type="button" 
            onClick={resetForm} 
            disabled={loading || fetching}
            style={{
              backgroundColor: 'transparent',
              color: '#116978',
              border: '1px solid #116978',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: '#f0f0f0'
              },
              '&:disabled': {
                borderColor: '#ccc',
                color: '#ccc',
                cursor: 'not-allowed'
              }
            }}
          >
            Reset Form
          </button>
          <button 
            type="submit" 
            disabled={loading || fetching}
            style={{
              backgroundColor: '#116978',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#0e5254'
              },
              '&:disabled': {
                backgroundColor: '#ccc',
                cursor: 'not-allowed'
              }
            }}
          >
            {loading ? 'Submitting...' : 'Add RTO Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RtoPage;