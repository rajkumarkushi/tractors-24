module.exports = {
    // API Configurations
    api: {
      version: '1.0.0',
      prefix: '/api/v1',
      rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
      }
    },
  
    // Firebase Configuration
    firebase: {
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    },
  
    // Payment Gateway Configuration
    payment: {
      razorpay: {
        keyId: process.env.RAZORPAY_KEY_ID,
        keySecret: process.env.RAZORPAY_KEY_SECRET
      }
    },
  
    // External APIs
    externalApis: {
      rto: {
        baseUrl: process.env.RTO_API_BASE_URL,
        apiKey: process.env.RTO_API_KEY
      },
      cibil: {
        baseUrl: process.env.CIBIL_API_BASE_URL,
        apiKey: process.env.CIBIL_API_KEY
      }
    },
  
    // App Settings
    settings: {
      defaultLanguage: 'en',
      supportedLanguages: ['en', 'hi', 'mr', 'gu', 'pa'],
      referralBonus: {
        referrer: 100,
        referred: 50
      },
      searchRadius: 50, // in kilometers
      pagination: {
        defaultLimit: 10,
        maxLimit: 50
      }
    }
  };