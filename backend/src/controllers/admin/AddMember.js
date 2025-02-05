
const { db,admin} = require('../firebaseconfig');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Add Member
const addMember = async (req, res) => {
  try {
    const cred={email,password}=req.body;
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    
    });
    
    // Hash the password for Firestore storage
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const memberData = {
      ...req.body,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Handle file upload if present
    if (req.files?.idProof) {
      const idProofUrl = await uploadFile(req.files.idProof);
      memberData.idProofUrl = idProofUrl;
    }
    const docRef = await db.collection('gymusers').doc(email).set(memberData);
    
    res.status(201).json({
      id: docRef.id,
      ...memberData,
      message: 'Member added successfully',
    });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
};

// Search Member
const searchMember = async (req, res) => {
  try {
    const { email } = req.query;
    
    const memberSnapshot = await db.collection('gymusers')
      .where('email', '==', email)
      .get();

    if (memberSnapshot.empty) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const memberData = {
      id: memberSnapshot.docs[0].id,
      ...memberSnapshot.docs[0].data(),
    };

    res.status(200).json(memberData);
  } catch (error) {
    console.error('Error searching member:', error);
    res.status(500).json({ error: 'Failed to search member' });
  }
};

// Update Member
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    // Handle file upload if present
    if (req.files?.idProof) {
      const idProofUrl = await uploadFile(req.files.idProof);
      updateData.idProofUrl = idProofUrl;
    }

    await db.collection('gymusers').doc(id).update(updateData);
    
    res.status(200).json({
      message: 'Member updated successfully',
    });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
};

module.exports = {
  addMember,
  searchMember,
  updateMember,
};