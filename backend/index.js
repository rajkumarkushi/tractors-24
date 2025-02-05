const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const authRoutes = require('./src/routes/authroutes');
const StockRoutes=require ('./src/routes/StockRoutes')
const tractorRoutes = require('./src/routes/TractorRoutes');
// const dealerRoutes = require('./src/routes/dealer.routes');
const enquiryRoutes = require('./src/routes/enquiry.route');
const admin = require("firebase-admin");
const rto = require('./src/routes/rto.routes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stock', StockRoutes);
app.use('/api/tractors', tractorRoutes);
// app.use('/api/dealers', dealerRoutes);
app.use('/api/inquiries', enquiryRoutes);
// app.use('/api/translate', translateRoutes);
app.use('/api/rto', rto);



const db = admin.firestore();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});