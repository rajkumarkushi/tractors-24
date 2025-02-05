const axios = require('axios');
const express = require('express');
const router = express.Router();

// Translation API configuration
const TRANSLATION_API_URL = 'https://text-translator2.p.rapidapi.com/translate';
const RAPID_API_KEY = '49151666camsh662703b072bcb65p1ca7efjsn7eb32beb0162'; // Replace with env variable in production

// Controller for translating text
router.post('/translate', async (req, res) => {
  const { text, target_language } = req.body;

  if (!text || !target_language) {
    return res.status(400).json({ error: 'Text and target language are required.' });
  }

  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', target_language);
    encodedParams.set('text', text);

    const options = {
      method: 'POST',
      url: TRANSLATION_API_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    const translatedText = response.data.data.translatedText;

    res.json({ translation: translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Failed to translate text.' });
  }
});

module.exports = router;
