// // const axios = require('axios');
// // const { db } = require('../config/firebase');

// // const RTO_API_KEY = process.env.RTO_API_KEY;
// // const RTO_BASE_URL = 'https://api.rto.example.com/v1'; // Replace with actual RTO API

// // const rtoController = {
// //   async getVehicleInfo(req, res) {
// //     try {
// //       const { registrationNumber } = req.params;
      
// //       const response = await axios.get(`${RTO_BASE_URL}/vehicle/${registrationNumber}`, {
// //         headers: { 'Authorization': `Bearer ${RTO_API_KEY}` }
// //       });

// //       // Store the RTO data in Firestore for future reference
// //       await db.collection('rtoLookups').add({
// //         registrationNumber,
// //         data: response.data,
// //         timestamp: new Date().toISOString(),
// //         userId: req.user.uid
// //       });

// //       res.json(response.data);
// //     } catch (error) {
// //       res.status(500).json({ message: 'Error fetching RTO data' });
// //     }
// //   },

// //   async validateRC(req, res) {
// //     try {
// //       const { rcNumber, ownerName } = req.body;
      
// //       const response = await axios.post(`${RTO_BASE_URL}/validate-rc`, {
// //         rcNumber,
// //         ownerName
// //       }, {
// //         headers: { 'Authorization': `Bearer ${RTO_API_KEY}` }
// //       });

// //       res.json(response.data);
// //     } catch (error) {
// //       res.status(500).json({ message: 'Error validating RC' });
// //     }
// //   }
// // };

// // module.exports = rtoController;


// const axios = require('axios');
// const { db } = require('../config/firebase');

// const RTO_RAPIDAPI_KEY = '49151666camsh662703b072bcb65p1ca7efjsn7eb32beb0162';
// const RTO_RAPIDAPI_HOST = 'vehicle-information-verification-rto-india.p.rapidapi.com';

// const rtoController = {
//   async getVehicleInfo(req, res) {
//     try {
//       const { registrationNumber } = req.body;

//       const options = {
//         method: 'POST',
//         url: 'https://vehicle-information-verification-rto-india.p.rapidapi.com/rc-full',
//         headers: {
//           'x-rapidapi-key': RTO_RAPIDAPI_KEY,
//           'x-rapidapi-host': RTO_RAPIDAPI_HOST,
//           'Content-Type': 'application/json'
//         },
//         data: {
//           id_number: registrationNumber
//         }
//       };

//       const response = await axios.request(options);

//       // Transform API response to match our frontend structure
//       const vehicleData = {
//         details: {
//           registrationNo: response.data.result.registration_number || '',
//           registrationDate: response.data.result.registration_date || '',
//           ownerName: response.data.result.owner_name || '',
//           vehicleClass: response.data.result.vehicle_class || '',
//           fuelType: response.data.result.fuel_type || '',
//           makerModel: response.data.result.maker_model || '',
//           fitnessUpto: response.data.result.fitness_upto || '',
//           insuranceUpto: response.data.result.insurance_upto || '',
//           fuelNorms: response.data.result.fuel_norms || '',
//           financierName: response.data.result.financier || '',
//           pucUpto: response.data.result.puc_upto || '',
//           roadTaxPaidUpto: response.data.result.tax_upto || '',
//           vehicleColor: response.data.result.color || '',
//           seatCapacity: response.data.result.seating_capacity || '',
//           unloadWeight: response.data.result.unloaded_weight || '',
//           bodyTypeDesc: response.data.result.body_type || '',
//           manufactureMonthYear: response.data.result.manufacturer_date || '',
//           rcStatus: response.data.result.rc_status || '',
//           ownershipDesc: response.data.result.ownership || '',
//           registrationAuthority: response.data.result.rto || ''
//         }
//       };

//       // Store the RTO data in Firestore
//       await db.collection('rtoLookups').add({
//         registrationNumber,
//         rawData: response.data,
//         transformedData: vehicleData,
//         timestamp: new Date().toISOString(),
//         userId: req.user?.uid || 'anonymous'
//       });

//       res.json(vehicleData);
//     } catch (error) {
//       console.error('RTO API Error:', error);
//       res.status(500).json({ 
//         message: 'Error fetching RTO data',
//         error: error.response?.data || error.message 
//       });
//     }
//   },

//   async addRtoRecord(req, res) {
//     try {
//       const rtoData = req.body;
      
//       // Store the RTO record in Firestore
//       const docRef = await db.collection('rtoRecords').add({
//         ...rtoData,
//         timestamp: new Date().toISOString(),
//         userId: req.user?.uid || 'anonymous'
//       });

//       res.json({ 
//         message: 'RTO record added successfully',
//         recordId: docRef.id 
//       });
//     } catch (error) {
//       console.error('Firestore Error:', error);
//       res.status(500).json({ 
//         message: 'Error adding RTO record',
//         error: error.message 
//       });
//     }
//   }
// };

// module.exports = rtoController;

const axios = require('axios');
const { db } = require('../config/firebase');

const RTO_RAPIDAPI_KEY = '49151666camsh662703b072bcb65p1ca7efjsn7eb32beb0162';
const RTO_RAPIDAPI_HOST = 'rto-vehicle-information-india1.p.rapidapi.com';

const rtoController = {
  async getVehicleInfo(req, res) {
    try {
      const { registrationNumber } = req.body;
      
      if (!registrationNumber) {
        return res.status(400).json({ 
          message: 'Registration number is required' 
        });
      }

      const options = {
        method: 'POST',
        url: 'https://rto-vehicle-information-india1.p.rapidapi.com/search_vehicle_details',
        headers: {
          'x-rapidapi-key': RTO_RAPIDAPI_KEY,
          'x-rapidapi-host': RTO_RAPIDAPI_HOST,
          'Content-Type': 'application/json'
        },
        data: {
          id_number: registrationNumber
        }
      };

      const response = await axios.request(options);
      
      // Add error checking for API response
      if (!response.data || !response.data.result) {
        return res.status(404).json({
          message: 'No data found for this registration number'
        });
      }

      // Transform API response to match our frontend structure
      const vehicleData = {
        details: {
          registrationNo: response.data.result.registration_number || '',
          registrationDate: response.data.result.registration_date || '',
          ownerName: response.data.result.owner_name || '',
          vehicleClass: response.data.result.vehicle_class || '',
          fuelType: response.data.result.fuel_type || '',
          makerModel: response.data.result.maker_model || '',
          fitnessUpto: response.data.result.fitness_upto || '',
          insuranceUpto: response.data.result.insurance_upto || '',
          fuelNorms: response.data.result.fuel_norms || '',
          financierName: response.data.result.financier || '',
          pucUpto: response.data.result.puc_upto || '',
          roadTaxPaidUpto: response.data.result.tax_upto || '',
          vehicleColor: response.data.result.color || '',
          seatCapacity: response.data.result.seating_capacity || '',
          unloadWeight: response.data.result.unloaded_weight || '',
          bodyTypeDesc: response.data.result.body_type || '',
          manufactureMonthYear: response.data.result.manufacturer_date || '',
          rcStatus: response.data.result.rc_status || '',
          ownershipDesc: response.data.result.ownership || '',
          registrationAuthority: response.data.result.rto || ''
        }
      };

      // Store the RTO data in Firestore
      try {
        await db.collection('rtoLookups').add({
          registrationNumber,
          rawData: response.data,
          transformedData: vehicleData,
          timestamp: new Date().toISOString(),
          userId: req.user?.uid || 'anonymous'
        });
      } catch (dbError) {
        console.error('Firestore Error:', dbError);
        // Continue with the response even if Firestore storage fails
      }

      res.json(vehicleData);
    } catch (error) {
      console.error('RTO API Error:', error.response?.data || error);
      res.status(500).json({ 
        message: 'Error fetching RTO data',
        error: error.response?.data?.message || error.message 
      });
    }
  },

  async addRtoRecord(req, res) {
    try {
      const rtoData = req.body;
      
      if (!rtoData.registrationNumber) {
        return res.status(400).json({
          message: 'Registration number is required'
        });
      }

      // Store the RTO record in Firestore
      const docRef = await db.collection('rtoRecords').add({
        ...rtoData,
        timestamp: new Date().toISOString(),
        userId: req.user?.uid || 'anonymous'
      });

      res.json({ 
        message: 'RTO record added successfully',
        recordId: docRef.id 
      });
    } catch (error) {
      console.error('Firestore Error:', error);
      res.status(500).json({ 
        message: 'Error adding RTO record',
        error: error.message 
      });
    }
  }
};

module.exports = rtoController;