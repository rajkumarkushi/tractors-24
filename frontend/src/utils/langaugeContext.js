// // src/context/languageContext.js
// import axios from 'axios';
// import React, { createContext, useCallback, useContext, useState } from 'react';
// import { textExtractor } from '../utils/textExtractor';

// const LanguageContext = createContext();

// // Language mapping
// const languageCodes = {
//   'English': 'en',
//   'Hindi': 'hi',
//   'Gujarati': 'gu',
//   'Tamil': 'ta',
//   'Spanish': 'es'
// };

// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('English');
//   const [translations, setTranslations] = useState(new Map());
//   const [isTranslating, setIsTranslating] = useState(false);

//   const translateTexts = async (texts, targetLanguage) => {
//     const encodedParams = new URLSearchParams();
//     encodedParams.set('source_language', 'en');
//     encodedParams.set('target_language', targetLanguage);
    
//     const translatedTexts = new Map();
    
//     // Translate in batches to avoid API limitations
//     const batchSize = 10;
//     const textArray = Array.from(texts.keys());
    
//     for (let i = 0; i < textArray.length; i += batchSize) {
//       const batch = textArray.slice(i, i + batchSize);
//       const batchPromises = batch.map(async (text) => {
//         try {
//           encodedParams.set('text', text);
//           const response = await axios({
//             method: 'POST',
//             url: 'https://text-translator2.p.rapidapi.com/translate',
//             headers: {
//               'content-type': 'application/x-www-form-urlencoded',
//               'X-RapidAPI-Key': '4f2ac69f50mshe341784f09e12d9p198613jsn89ceb8ff3ed0',
//               'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
//             },
//             data: encodedParams,
//           });
          
//           return {
//             original: text,
//             translated: response.data.data.translatedText
//           };
//         } catch (error) {
//           console.error('Translation error for text:', text, error);
//           return { original: text, translated: text };
//         }
//       });

//       const batchResults = await Promise.all(batchPromises);
//       batchResults.forEach(({ original, translated }) => {
//         translatedTexts.set(original, translated);
//       });

//       // Add a small delay between batches to avoid rate limiting
//       if (i + batchSize < textArray.length) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       }
//     }

//     return translatedTexts;
//   };

//   const translatePage = useCallback(async (newLanguage) => {
//     if (newLanguage === 'English') {
//       setTranslations(new Map());
//       return;
//     }

//     setIsTranslating(true);
//     try {
//       // Extract all text content from the page
//       const textsToTranslate = textExtractor.extractTextContent(document.body);
//       console.log('Texts to translate:', textsToTranslate);
      
//       // Translate all texts
//       const translatedTexts = await translateTexts(textsToTranslate, languageCodes[newLanguage]);
//       console.log('Translated texts:', translatedTexts);
      
//       // Apply translations
//       textExtractor.applyTranslations(translatedTexts, document.body);
      
//       // Store translations for future use
//       setTranslations(translatedTexts);
//     } catch (error) {
//       console.error('Translation failed:', error);
//     } finally {
//       setIsTranslating(false);
//     }
//   }, []);

//   const changeLanguage = async (newLanguage) => {
//     setLanguage(newLanguage);
//     await translatePage(newLanguage);
//   };

//   return (
//     <LanguageContext.Provider 
//       value={{ 
//         language, 
//         changeLanguage, 
//         isTranslating,
//       }}
//     >
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };
// src/utils/languageContext.js
// import axios from 'axios';
// import React, { createContext, useContext, useState } from 'react';

// const LanguageContext = createContext();

// const languageCodes = {
//   'English': 'en',
//   'Hindi': 'hi',
//   'Gujarati': 'gu',
//   'Tamil': 'ta',
//   'Spanish': 'es'
// };

// const navbarTranslations = {
//   en: {
//     home: 'Home',
//     about: 'About',
//     services: 'Services',
//     products: 'Products',
//     contact: 'Contact',
//     loginSignup: 'Login/Signup',
//     login: 'Login',
//     signup: 'Sign Up',
//     chennai: 'Chennai',
//     mumbai: 'Mumbai',
//     delhi: 'Delhi',
//     sellTractor: 'Sell a Tractor',
//     auction: 'Auction',
//     applyLoan: 'Apply Loan',
//     emiCalculator: 'EMI Calculator',
//     referCustomer: 'Refer a Customer',
//     more: 'More',
//     payLoanEmi: 'Pay Loan EMI'
//   }
// };

// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('English');
//   const [translations, setTranslations] = useState(navbarTranslations.en);
//   const [isTranslating, setIsTranslating] = useState(false);

//   const translateText = async (text, targetLang) => {
//     if (!text || targetLang === 'English') return text;

//     const encodedParams = new URLSearchParams();
//     encodedParams.set('source_language', 'en');
//     encodedParams.set('target_language', languageCodes[targetLang]);
//     encodedParams.set('text', text);

//     try {
//       const response = await axios({
//         method: 'POST',
//         url: 'https://text-translator2.p.rapidapi.com/translate',
//         headers: {
//           'content-type': 'application/x-www-form-urlencoded',
//           'X-RapidAPI-Key': '92e533b948msh41b65eef6929fa4p16d7a1jsn945a3d23bac5',
//           'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
//         },
//         data: encodedParams,
//       });
      
//       return response.data.data.translatedText;
//     } catch (error) {
//       console.error('Translation error:', error);
//       return text;
//     }
//   };

//   const translateNavbarContent = async (newLanguage) => {
//     if (newLanguage === 'English') {
//       setTranslations(navbarTranslations.en);
//       return;
//     }

//     setIsTranslating(true);
//     try {
//       const newTranslations = {};
//       for (const [key, value] of Object.entries(navbarTranslations.en)) {
//         newTranslations[key] = await translateText(value, newLanguage);
//       }
//       setTranslations(newTranslations);
//     } catch (error) {
//       console.error('Translation failed:', error);
//       setTranslations(navbarTranslations.en);
//     } finally {
//       setIsTranslating(false);
//     }
//   };

//   const changeLanguage = async (newLanguage) => {
//     setLanguage(newLanguage);
//     await translateNavbarContent(newLanguage);
//   };

//   return (
//     <LanguageContext.Provider 
//       value={{ 
//         language,
//         translations,
//         changeLanguage,
//         isTranslating,
//         translateText
//       }}
//     >
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

const languageCodes = {
  'English': 'en',
  'Hindi': 'hi',
  'Gujarati': 'gu',
  'Tamil': 'ta',
  'Spanish': 'es'
};

const navbarTranslations = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    products: 'Products',
    contact: 'Contact',
    loginSignup: 'Login/Signup',
    login: 'Login',
    signup: 'Sign Up',
    chennai: 'Chennai',
    mumbai: 'Mumbai',
    delhi: 'Delhi',
    sellTractor: 'Sell a Tractor',
    auction: 'Auction',
    applyLoan: 'Apply Loan',
    emiCalculator: 'EMI Calculator',
    referCustomer: 'Refer a Customer',
    more: 'More',
    payLoanEmi: 'Pay Loan EMI'
  }
};

export const LanguageProvider = ({ children }) => {
  // Initialize state from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'English';
  });
  const [translations, setTranslations] = useState(() => {
    const savedTranslations = localStorage.getItem('translations');
    return savedTranslations ? JSON.parse(savedTranslations) : navbarTranslations.en;
  });
  const [isTranslating, setIsTranslating] = useState(false);

  // Load saved translations on initial mount
  useEffect(() => {
    const initializeLanguage = async () => {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && savedLanguage !== 'English') {
        await translateNavbarContent(savedLanguage);
      }
    };

    initializeLanguage();
  }, []);

  const translateText = async (text, targetLang) => {
    if (!text || targetLang === 'English') return text;

    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', languageCodes[targetLang]);
    encodedParams.set('text', text);

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',

          'X-RapidAPI-Key': '22e5acb4d0msh1ad04fcf2a7b3bep12412ejsn4032019a43a9',
          'X-RapidAPI-Key': '0a741e0bedmsh84c9851f6000a60p168160jsna823fd37cfa',

          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodedParams,
      });
      
      return response.data.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const translateNavbarContent = async (newLanguage) => {
    if (newLanguage === 'English') {
      setTranslations(navbarTranslations.en);
      localStorage.setItem('translations', JSON.stringify(navbarTranslations.en));
      return;
    }

    setIsTranslating(true);
    try {
      const newTranslations = {};
      for (const [key, value] of Object.entries(navbarTranslations.en)) {
        newTranslations[key] = await translateText(value, newLanguage);
      }
      setTranslations(newTranslations);
      localStorage.setItem('translations', JSON.stringify(newTranslations));
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslations(navbarTranslations.en);
      localStorage.setItem('translations', JSON.stringify(navbarTranslations.en));
    } finally {
      setIsTranslating(false);
    }
  };

  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    await translateNavbarContent(newLanguage);
  };

  // Add a method to get translations for new content
  const getContentTranslation = async (content) => {
    if (language === 'English') return content;
    try {
      return await translateText(content, language);
    } catch (error) {
      console.error('Content translation failed:', error);
      return content;
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language,
        translations,
        changeLanguage,
        isTranslating,
        translateText,
        getContentTranslation
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};