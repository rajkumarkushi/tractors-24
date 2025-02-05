// require('dotenv').config();
// const axios = require('axios');

// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
// const RAPIDAPI_HOST = 'microsoft-translator-text.p.rapidapi.com';

// async function testTranslation() {
//   const options = {
//     method: 'POST',
//     url: `https://${RAPIDAPI_HOST}/translate`,
//     params: {
//       'api-version': '3.0',
//       'to': 'hi',
//       'textType': 'plain',
//     },
//     headers: {
//       'content-type': 'application/json',
//       'X-RapidAPI-Key': RAPIDAPI_KEY,
//       'X-RapidAPI-Host': RAPIDAPI_HOST
//     },
//     data: [{
//       Text: 'Hello World'
//     }]
//   };

//   try {
//     const response = await axios.request(options);
//     console.log('Test successful:', response.data);
//   } catch (error) {
//     console.error('Test failed:', error.response?.data || error.message);
//   }
// }

// testTranslation();

require('dotenv').config();
const axios = require('axios');

async function testTranslation() {
  const encodedParams = new URLSearchParams();
  encodedParams.set('source_language', 'en');
  encodedParams.set('target_language', 'gu');
  encodedParams.set('text', 'What is your name?');

  const options = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '49151666camsh662703b072bcb65p1ca7efjsn7eb32beb0162',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    data: encodedParams
  };

  try {
    console.log('Attempting translation...');
    const response = await axios.request(options);
    console.log('Translation successful:', response.data);
  } catch (error) {
    console.error('Translation failed:', error.response?.data || error.message);
  }
}

testTranslation();