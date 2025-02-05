// // const express = require('express');
// // const axios = require('axios');
// // const router = express.Router();

// // const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '49151666camsh662703b072bcb65p1ca7efjsn7eb32beb0162';
// // const RAPIDAPI_HOST = 'microsoft-translator-text.p.rapidapi.com';

// // // Endpoint to get supported languages (no change here)
// // router.get('/languages', async (req, res) => {
// //   const options = {
// //     method: 'GET',
// //     url: `https://${RAPIDAPI_HOST}/languages`,
// //     params: {
// //       'api-version': '3.0',
// //     },
// //     headers: {
// //       'x-rapidapi-key': RAPIDAPI_KEY,
// //       'x-rapidapi-host': RAPIDAPI_HOST,
// //     },
// //   };

// //   try {
// //     const response = await axios.request(options);
// //     res.json(response.data); // Send the languages back to the client
// //   } catch (error) {
// //     console.error('Error fetching supported languages:', error.message);
// //     res.status(500).json({ error: 'Failed to fetch supported languages' });
// //   }
// // });

// // // Endpoint to handle translation of texts
// // router.post('/translate', async (req, res) => {
// //   const { texts, targetLanguage } = req.body;

// //   if (!texts || !targetLanguage) {
// //     return res.status(400).json({ error: 'Texts and targetLanguage are required' });
// //   }

// //   const translationTexts = Object.values(texts); // Extract the values of the texts to translate
// //   const translationKeys = Object.keys(texts); // To map back the translated text to its original key

// //   const options = {
// //     method: 'POST',
// //     url: `https://${RAPIDAPI_HOST}/translate`,
// //     params: {
// //       'api-version': '3.0',
// //       'to': targetLanguage, // Set the target language
// //     },
// //     headers: {
// //       'x-rapidapi-key': RAPIDAPI_KEY,
// //       'x-rapidapi-host': RAPIDAPI_HOST,
// //       'Content-Type': 'application/json',
// //     },
// //     data: [
// //       {
// //         Text: translationTexts.join('\n'), // Send all texts together as one body
// //       },
// //     ],
// //   };

// //   try {
// //     // Request translations
// //     const response = await axios.request(options);

// //     // Mapping back translated texts to their respective keys
// //     const translatedTexts = {};
// //     response.data[0].translations.forEach((translation, index) => {
// //       translatedTexts[translationKeys[index]] = translation.text;
// //     });

// //     res.json({ translations: translatedTexts });
// //   } catch (error) {
// //     console.error('Error translating text:', error.message);
// //     res.status(500).json({ error: 'Translation failed' });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '49151666camsh662703b072bcb65p1ca7efjsn7eb32beb0162';
// const RAPIDAPI_HOST = 'microsoft-translator-text.p.rapidapi.com';

// // Existing languages route
// router.get('/languages', async (req, res) => {
//   const options = {
//     method: 'GET',
//     url: `https://${RAPIDAPI_HOST}/languages`,
//     params: {
//       'api-version': '3.0',
//     },
//     headers: {
//       'x-rapidapi-key': RAPIDAPI_KEY,
//       'x-rapidapi-host': RAPIDAPI_HOST,
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     res.json(response.data); // Send the languages back to the client
//   } catch (error) {
//     console.error('Error fetching supported languages:', error.message);
//     res.status(500).json({ error: 'Failed to fetch supported languages' });
//   }
// });

// // Translate route
// router.post('/translate', async (req, res) => {
//   const { texts, targetLanguage } = req.body;

//   if (!texts || !targetLanguage) {
//     return res.status(400).json({ error: 'Texts and targetLanguage are required' });
//   }

//   const translationTexts = Object.values(texts); // Extract the values of the texts to translate
//   const translationKeys = Object.keys(texts); // To map back the translated text to its original key

//   const options = {
//     method: 'POST',
//     url: `https://${RAPIDAPI_HOST}/translate`,
//     params: {
//       'api-version': '3.0',
//       'to': targetLanguage, // Set the target language
//     },
//     headers: {
//       'x-rapidapi-key': RAPIDAPI_KEY,
//       'x-rapidapi-host': RAPIDAPI_HOST,
//       'Content-Type': 'application/json',
//     },
//     data: [
//       {
//         Text: translationTexts.join('\n'), // Send all texts together as one body
//       },
//     ],
//   };

//   try {
//     // Request translations
//     const response = await axios.request(options);

//     // Mapping back translated texts to their respective keys
//     const translatedTexts = {};
//     response.data[0].translations.forEach((translation, index) => {
//       translatedTexts[translationKeys[index]] = translation.text;
//     });

//     res.json({ translations: translatedTexts });
//   } catch (error) {
//     console.error('Error translating text:', error.message);
//     res.status(500).json({ error: 'Translation failed' });
//   }
// });

// module.exports = router;
// const express = require('express');
// const axios = require('axios');
// const router = express.Router();
// require('dotenv').config();

// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
// const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'microsoft-translator-text.p.rapidapi.com';

// // Existing languages route
// router.get('/languages', async (req, res) => {
//   const options = {
//     method: 'GET',
//     url: `https://${RAPIDAPI_HOST}/languages`,
//     params: {
//       'api-version': '3.0'
//     },
//     headers: {
//       'X-RapidAPI-Key': RAPIDAPI_KEY,
//       'X-RapidAPI-Host': RAPIDAPI_HOST
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching supported languages:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to fetch supported languages' });
//   }
// });

// // Translate route
// router.post('/translate', async (req, res) => {
//   const { texts, targetLanguage } = req.body;

//   if (!texts || !targetLanguage) {
//     return res.status(400).json({ error: 'Texts and targetLanguage are required' });
//   }

//   const options = {
//     method: 'POST',
//     url: `https://${RAPIDAPI_HOST}/translate`,
//     params: {
//       'api-version': '3.0',
//       'to': targetLanguage,
//       'textType': 'plain',
//       'profanityAction': 'NoAction'
//     },
//     headers: {
//       'content-type': 'application/json',
//       'X-RapidAPI-Key': RAPIDAPI_KEY,
//       'X-RapidAPI-Host': RAPIDAPI_HOST
//     },
//     data: Object.keys(texts).map(key => ({
//       Text: texts[key]
//     }))
//   };

//   try {
//     const response = await axios.request(options);
    
//     // Create translations object mapping back to original keys
//     const translatedTexts = {};
//     Object.keys(texts).forEach((key, index) => {
//       translatedTexts[key] = response.data[index].translations[0].text;
//     });

//     res.json({ translations: translatedTexts });
//   } catch (error) {
//     console.error('Error translating text:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Translation failed', details: error.response?.data });
//   }
// });

// module.exports = router;