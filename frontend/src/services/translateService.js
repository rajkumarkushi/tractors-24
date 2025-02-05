
const BASE_URL = 'http://localhost:5000/api';

export const translationService = {
  async getSupportedLanguages() {
    try {
      const response = await fetch(`${BASE_URL}/translate/languages`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error;
    }
  },

  async translateTexts({ texts, targetLanguage }) {
    try {
      // Create the request payload
      const requestPayload = {
        text: Array.isArray(texts) ? texts.join('\n') : texts,
        target_language: targetLanguage
      };

      console.log('Translation Request Payload:', requestPayload);

      const response = await fetch(`${BASE_URL}/translate/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Translation API Error Response:', errorData);
        throw new Error(errorData.message || 'Translation failed');
      }

      const data = await response.json();
      console.log('Translation API Success Response:', data);

      // If the response is a single translated text, split it back into an array
      if (typeof data.translation === 'string') {
        return data.translation.split('\n');
      }
      
      return data.translations || data.translation || texts;
    } catch (error) {
      console.error('Error translating texts:', error);
      throw error;
    }
  }
};

