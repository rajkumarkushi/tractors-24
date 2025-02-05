const {db,admin}=require('../config/firebase');
const addTractor = async (req, res) => {
  try {
   

      const {
        brand, name, model, registrationYear, horsePower,
        rearTyre, hours, sellPrice, showroomPrice,
        listingDate, insuranceStatus, registrationNumber,
        description, state, district, pincode,category
      } = req.body;

      // Validate required fields including location
      const requiredFields = [
        'brand', 'name', 'model', 'registrationYear', 
        'horsePower', 'sellPrice', 'showroomPrice', 
        'registrationNumber', 'state', 'district', 'pincode'
      ];

      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Missing required fields",
          fields: missingFields
        });
      }

     
      const tractorData = {
        brand,
name,
model,
registrationYear,
horsePower,
rearTyre,
hours ,
category,
sellPrice,
showroomPrice,
listingDate: listingDate ? new Date(listingDate) : admin.firestore.FieldValue.serverTimestamp(),
insuranceStatus,
registrationNumber,
description,
// showroomId,
status: 'active',
        state,
        district,
        pincode,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection("tractors").add(tractorData);
      
      res.status(201).json({
        message: "Tractor added successfully",
        tractorId: docRef.id,
        data: tractorData
      });
    
  } catch (error) {
    console.error("Error adding tractor:", error);
    res.status(500).json({ 
      message: "Failed to add tractor", 
      error: error.message 
    });
  }
};
const getTractors = async (req, res) => {
  try {
    const { 
      showroomId, 
      brand, 
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      limit = 50,
      page = 1
    } = req.query;

    let tractorsRef = db.collection("tractors");
    
    // Apply filters
    if (showroomId) {
      tractorsRef = tractorsRef.where("showroomId", "==", showroomId);
    }
    if (brand) {
      tractorsRef = tractorsRef.where("brand", "==", brand);
    }
    if (status) {
      tractorsRef = tractorsRef.where("status", "==", status);
    }

    // Apply sorting
    tractorsRef = tractorsRef.orderBy(sortBy, sortOrder);

    // Apply pagination
    const startAt = (page - 1) * limit;
    tractorsRef = tractorsRef.limit(parseInt(limit)).offset(startAt);

    const snapshot = await tractorsRef.get();
    const tractors = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      tractors.push({
        id: doc.id,
        ...data,
        // listingDate: data.listingDate ? data.listingDate.toDate() : null,
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : null
      });
    });

    // Get total count for pagination
    const totalSnapshot = await db.collection("tractors").count().get();
    const total = totalSnapshot.data().count;

    res.status(200).json({ 
      tractors,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching tractors:", error);
    res.status(500).json({ 
      message: "Failed to fetch tractors", 
      error: error.message 
    });
  }
};
// Update tractor details
const updateTractor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    // id: doc.id,

    delete updateData.createdAt;

    updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    console.log(id,updateData)

    await db.collection("tractors").doc(id).update(updateData);

    res.status(200).json({
      message: "Tractor updated successfully",
      id,
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    console.error("Error updating tractor:", error);
    res.status(500).json({ 
      message: "Failed to update tractor", 
      error: error.message 
    });
  }
};

// Delete tractor
const deleteTractor = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection("tractors").doc(id).delete();

    res.status(200).json({
      message: "Tractor deleted successfully",
      id
    });
  } catch (error) {
    console.error("Error deleting tractor:", error);
    res.status(500).json({ 
      message: "Failed to delete tractor", 
      error: error.message 
    });
  }
};

//get tractors by braND
const getTractorsByBrand = async (req, res) => {
  try {
    const { brandName } = req.params; // Extract brandName from the URL

    // Query Firestore to get tractors with the specified brand
    const snapshot = await db.collection("tractors").where("brand", "==", brandName).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: `No tractors found for brand: ${brandName}` });
    }

    const tractors = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      tractors.push({
        id: doc.id,
        ...data,
        listingDate: data.listingDate ? data.listingDate.toDate() : null,
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : null
      });
    });

    res.status(200).json(tractors);
  } catch (error) {
    console.error("Error fetching tractors by brand:", error);
    res.status(500).json({ 
      message: "Failed to fetch tractors by brand", 
      error: error.message 
    });
  }
};



module.exports = { 
  addTractor, 
  getTractors,
  updateTractor,
  deleteTractor,
  getTractorsByBrand // Export the new function
};