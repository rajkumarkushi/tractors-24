// Get popular tractors
const { db, admin, storage } = require("../config/firebase");
const GetPopularTractors = async (req, res) => {
  try {
    const { 
      showroomId, 
      brand, 
      status = 'active',
      category,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      limit = 8,
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
    if (category) {
      tractorsRef = tractorsRef.where("category", "==", category);
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
    const totalSnapshot = await tractorsRef.count().get();
    const total = totalSnapshot.data().count;

    res.status(200).json({ 
      success: true,
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
      success: false,
      message: "Failed to fetch tractors", 
      error: error.message 
    });
  }
    };
    
    // Helper function to get sample tractor data
    const getSampleTractors = () => {
      return [
        {
          id: 'sample1',
          brand: 'Mahindra',
          name: '575 DI',
          model: '2023',
          registrationYear: '2023',
          horsePower: '47',
          rearTyre: '13.6-28',
          hours: '100',
          sellPrice: '7.5',
          showroomPrice: '8.5',
          insuranceStatus: 'Active',
          registrationNumber: 'TN01AB1234',
          description: 'Well maintained tractor with all features',
          state: 'Tamil Nadu',
          district: 'Chennai',
          pincode: '600001',
          images: ['/sample-tractor-1.jpg'],
          status: 'active',
          listingDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'sample2',
          brand: 'Sonalika',
          name: '750 DI',
          model: '2022',
          registrationYear: '2022',
          horsePower: '75',
          rearTyre: '16.9-28',
          hours: '200',
          sellPrice: '9.5',
          showroomPrice: '10.5',
          insuranceStatus: 'Active',
          registrationNumber: 'TN02CD5678',
          description: 'Premium tractor with excellent condition',
          state: 'Tamil Nadu',
          district: 'Coimbatore',
          pincode: '641001',
          images: ['/sample-tractor-2.jpg'],
          status: 'active',
          listingDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        // Add more sample tractors as needed
      ];
    };
  module.exports = { GetPopularTractors };