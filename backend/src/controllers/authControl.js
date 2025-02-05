const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { admin, db } = require("../config/firebase"); // Import the admin and db from the new config

const register = async (req, res) => {
  try {
    const { email, password, role, name, phone, } = req.body;

    // Check if the user already exists
    const existingUser = await db.collection("users").doc(email).get();
    if (existingUser.exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
   
    });

    // Hash the password for Firestore storage
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userJson = {
      role,
      name,
      email,
      password: hashedPassword, // Store the hashed password
      phone,
      
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Store user data in Firestore
    await db.collection("users").doc(email).set(userJson);
    res.status(201).json({ message: "User registered successfully", user: userRecord });
  } catch (error) {
    console.error("Registration error:", error);
    console.log(error)
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password ,role } = req.body;

    // Fetch the user by email
    const userSnapshot = await db.collection("users").doc(email).get();

    console.log(JSON.stringify(userSnapshot.data()));

    if (!userSnapshot.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userSnapshot.data();
    const hashedPassword = userData.password;

    // Compare the password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: userData.email, role: userData.role },
      "secrettd",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        email: userData.email,
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// BasicInfo function remains unchanged
const BasicInfo = async (req, res) => {
  try {
    const id = req.body.email;

    const Details = {
      height: req.body.height,
      weight: req.body.weight,
      goal: req.body.goal,
      activedays: req.body.activedays,
    };

    const Detail = await db.collection("users").doc(id).update(Details);
    console.log(Detail);
    res.send(Detail);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { register, login, BasicInfo };