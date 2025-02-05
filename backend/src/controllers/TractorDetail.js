// backend/controllers/tractorController.js
const { db, admin } = require("../config/firebase");

const GetTractorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Get tractor document
    const tractorDoc = await db.collection("tractors").doc(id).get();

    if (!tractorDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Tractor not found"
      });
    }

    const tractorData = tractorDoc.data();

    // Get showroom details
    let showroomData = null;
    if (tractorData.showroomId) {
      const showroomDoc = await db.collection("showrooms")
        .doc(tractorData.showroomId)
        .get();
      if (showroomDoc.exists) {
        showroomData = showroomDoc.data();
      }
    }

    // Get similar tractors (same brand, excluding current tractor)
    const similarTractorsSnapshot = await db.collection("tractors")
      .where("brand", "==", tractorData.brand)
      .where("status", "==", "active")
      .where(admin.firestore.FieldPath.documentId(), "!=", id)
      .limit(4)
      .get();

    const similarTractors = [];
    similarTractorsSnapshot.forEach(doc => {
      similarTractors.push({
        id: doc.id,
        ...doc.data(),
        // listingDate: doc.data().listingDate ? doc.data().listingDate.toDate() : null,
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
        updatedAt: doc.data().updatedAt ? doc.data().updatedAt.toDate() : null
      });
    });

    // Format response
    const response = {
      success: true,
      tractor: {
        id: tractorDoc.id,
        ...tractorData,
        // listingDate: tractorData.listingDate ? tractorData.listingDate.toDate() : null,
        createdAt: tractorData.createdAt ? tractorData.createdAt.toDate() : null,
        updatedAt: tractorData.updatedAt ? tractorData.updatedAt.toDate() : null,
        showroom: showroomData ? {
          id: tractorData.showroomId,
          ...showroomData,
          createdAt: showroomData.createdAt ? showroomData.createdAt.toDate() : null
        } : null
      },
      similarTractors
    };

    // Track view count (optional)
    await db.collection("tractors").doc(id).update({
      viewCount: admin.firestore.FieldValue.increment(1)
    });

    res.status(200).json(response);

  } catch (error) {
    console.error("Error fetching tractor details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tractor details",
      error: error.message
    });
  }
};

// Contact Seller API
const ContactSeller = async (req, res) => {
  try {
    const { tractorId } = req.params;
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Get tractor details
    const tractorDoc = await db.collection("tractors").doc(tractorId).get();
    if (!tractorDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Tractor not found"
      });
    }

    // Create inquiry in Firestore
    const inquiryRef = await db.collection("inquiries").add({
      tractorId,
      tractorDetails: {
        brand: tractorDoc.data().brand,
        model: tractorDoc.data().model,
        registrationNumber: tractorDoc.data().registrationNumber
      },
      customer: {
        name,
        email,
        phone
      },
      message,
      status: 'new',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      showroomId: tractorDoc.data().showroomId
    });

    // Optional: Send notification to showroom owner
    if (tractorDoc.data().showroomId) {
      await db.collection("notifications").add({
        type: 'NEW_INQUIRY',
        showroomId: tractorDoc.data().showroomId,
        tractorId,
        inquiryId: inquiryRef.id,
        message: `New inquiry from ${name} for ${tractorDoc.data().brand} ${tractorDoc.data().model}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        read: false
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiryId: inquiryRef.id
    });

  } catch (error) {
    console.error("Error submitting inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit inquiry",
      error: error.message
    });
  }
};

// Example Firestore document structure for tractors collection
/*
tractors/{tractorId}: {
  brand: string,
  name: string,
  model: string,
  registrationYear: string,
  horsePower: string,
  rearTyre: string,
  hours: string,
  sellPrice: string,
  showroomPrice: string,
  insuranceStatus: string,
  registrationNumber: string,
  description: string,
  state: string,
  district: string,
  pincode: string,
  images: string[],
  status: 'active' | 'inactive' | 'sold',
  category: string,
  showroomId: string,
  specifications: {
    engine: string,
    transmission: string,
    fuelType: string,
    mileage: string,
    engineCC: number,
    noOfCylinders: number,
    gearBox: string,
    wheelDrive: string
  },
  features: string[],
  viewCount: number,
  listingDate: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
*/

module.exports = {
  GetTractorDetails,
  ContactSeller
};