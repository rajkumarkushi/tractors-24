// const { db } = require('../config/firebase');

// const createLoanEnquiry = async (req, res) => {
//   try {
//     const { fullName, phone, email, loanAmount, tractorModel, state, city } = req.body;

//     const enquiryData = {
//       type: 'LOAN',
//       fullName,
//       phone,
//       email,
//       loanAmount,
//       tractorModel,
//       state,
//       city,
//       status: 'NEW',
//       createdAt: new Date().toISOString()
//     };

//     await db.collection('enquiries').add(enquiryData);
//     res.status(201).json({ message: 'Loan enquiry submitted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getMyEnquiries = async (req, res) => {
//   try {
//     const snapshot = await db.collection('enquiries')
//       .where('email', '==', req.user.email)
//       .orderBy('createdAt', 'desc')
//       .get();

//     const enquiries = [];
//     snapshot.forEach(doc => {
//       enquiries.push({ id: doc.id, ...doc.data() });
//     });

//     res.json(enquiries);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createLoanEnquiry,
//   getMyEnquiries
// };

const { db } = require("../config/firebase");
const admin = require("firebase-admin");

// Add new customer inquiry
const addInquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      tractorId,
      message,
      // showroomId
    } = req.body;

    const inquiryData = {
      name,
      email,
      mobile,
      tractorId,
      message,
      // showroomId,
      status: 'pending', // pending, responded, closed
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("inquiries").add(inquiryData);
    
    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiryId: docRef.id,
      data: inquiryData
    });
  } catch (error) {
    console.error("Error adding inquiry:", error);
    res.status(500).json({ message: "Failed to submit inquiry", error: error.message });
  }
};

// Get all inquiries for a showroom
const getInquiries = async (req, res) => {
  try {
    const { showroomId, status } = req.query;
    let inquiriesRef = db.collection("inquiries");
    
    if (showroomId) {
      inquiriesRef = inquiriesRef.where("showroomId", "==", showroomId);
    }

    if (status) {
      inquiriesRef = inquiriesRef.where("status", "==", status);
    }

    const snapshot = await inquiriesRef.orderBy("createdAt", "desc").get();
    const inquiries = [];

    snapshot.forEach(doc => {
      inquiries.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({ inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ message: "Failed to fetch inquiries", error: error.message });
  }
};

// Update inquiry status
const updateInquiryStatus = async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const { status, response } = req.body;

    await db.collection("inquiries").doc(inquiryId).update({
      status,
      response,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({ message: "Inquiry updated successfully" });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({ message: "Failed to update inquiry", error: error.message });
  }
};

module.exports = { addInquiry, getInquiries, updateInquiryStatus };