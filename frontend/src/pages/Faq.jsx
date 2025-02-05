import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useLanguage } from '../utils/langaugeContext';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px;
  gap: 20px;
  height: 600px; /* Adjust as needed for balanced height */
`;

const FAQSection = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
  border-radius: 8px;
`;

const MapSection = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const FAQTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
`;

const FAQCategory = styled.div`
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const FAQCategoryTitle = styled.div`
  padding: 16px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const FAQQuestion = styled.div`
  padding: 16px;
  background-color: #b3ecf1;
  border-bottom: 10px solid white;
  border-top: 10px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 24px;
  margin: 0 10px;
`;

const FAQAnswer = styled.div`
  padding: 16px;
  background-color: #c2f5f0;
  border-radius: 36px;
  border-bottom: 10px solid white;
  margin: 0 5px;
`;

const ToggleIcon = styled.span`
  font-size: 24px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [translatedFaqData, setTranslatedFaqData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language, translateText } = useLanguage();

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenQuestion(null);
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const originalFaqData = [
    {
      category: "For Buyers",
      questions: [
        {
          question: "How can I change the language of the platform?",
          answer: [
            "You can change the language by navigating to the settings menu and selecting your preferred language from the available options."
          ]
        },
        {
          question: "Is this website available in regional languages?",
          answer: [
            "Yes, the platform supports multiple languages to cater to a diverse user base."
          ]
        },
        {
          question: "How do I log in to my account?",
          answer: [
            "To log in, click on the 'Login' button on the homepage and enter your credentials. If you encounter any issues, please check your username and password."
          ]
        },
        {
          question: "What should I do if I forgot my password?",
          answer: [
            "If you forgot your password, click on the 'Forgot Password?' link on the login page and follow the instructions to reset it."
          ]
        },
        {
          question: "How do I search for tractors near me?",
          answer: [
            "You can use the advanced search options to filter listings based on your location, including state, city, and district."
          ]
        },
        {
          question: "Can I view my transaction history?",
          answer: [
            "Yes, you can view your transaction history by logging into your account and navigating to the wallet section."
          ]
        }
      ]
    },
    {
      category: "For Sellers",
      questions: [
        {
          question: "How can I post a tractor for sale?",
          answer: [
            "You can post a tractor for sale by accessing the seller dashboard and filling out the listing form with the necessary details."
          ]
        },
        {
          question: "What filters are available for searching tractors?",
          answer: [
            "You can filter listings by various criteria, including location, price range, and tractor specifications."
          ]
        },
        {
          question: "How does the referral system work?",
          answer: [
            "You can earn rewards by referring others to the platform. Once they sign up and complete a transaction, you will receive your rewards."
          ]
        }
      ]
    },
    {
      category: "For Dealers",
      questions: [
        {
          question: "How can a dealer create an account?",
          answer: [
            "Dealers can create an account by filling out the registration form available on the dealer login portal."
          ]
        },
        {
          question: "What are the benefits of the dealer login portal?",
          answer: [
            "The dealer login portal allows you to post listings, view customer details, and manage your margins effectively."
          ]
        },
        {
          question: "Where can I find showroom details?",
          answer: [
            "Showroom details can be found in the 'Showrooms' section of the website."
          ]
        },
        {
          question: "How do I inquire about becoming a dealer?",
          answer: [
            "You can inquire about becoming a dealer by filling out the inquiry form available on the platform."
          ]
        }
      ]
    }
  ];


  const translateFaqContent = async () => {
    if (language === 'English') {
      setTranslatedFaqData(originalFaqData);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const translated = await Promise.all(
        originalFaqData.map(async (category) => ({
          category: await translateText(category.category, language),
          questions: await Promise.all(
            category.questions.map(async (q) => ({
              question: await translateText(q.question, language),
              answer: await Promise.all(q.answer.map(text => translateText(text, language)))
            }))
          ),
        }))
      );
      setTranslatedFaqData(translated);
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedFaqData(originalFaqData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (translateText) {
      translateFaqContent();
    }
  }, [language, translateText]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  return (
    <Container>
      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <p>Questions commonly asked by Buyers and Sellers</p>
        {translatedFaqData?.map((category, categoryIndex) => (
          <FAQCategory key={categoryIndex}>
            <FAQCategoryTitle onClick={() => toggleCategory(categoryIndex)}>
              {category.category}
              <ToggleIcon>
                {openCategory === categoryIndex ? "▲" : "▼"}
              </ToggleIcon>
            </FAQCategoryTitle>
            {openCategory === categoryIndex &&
              category.questions.map((item, questionIndex) => (
                <div key={questionIndex}>
                  <FAQQuestion onClick={() => toggleQuestion(questionIndex)}>
                    {item.question}
                    <ToggleIcon>
                      {openQuestion === questionIndex ? "−" : "+"}
                    </ToggleIcon>
                  </FAQQuestion>
                  {openQuestion === questionIndex && (
                    <FAQAnswer>
                      <ul>
                        {item.answer.map((text, idx) => (
                          <li key={idx}>{text}</li>
                        ))}
                      </ul>
                    </FAQAnswer>
                  )}
                </div>
              ))}
          </FAQCategory>
        ))}
      </FAQSection>
      <MapSection>
        <MapIframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508616!2d144.95373511590418!3d-37.81627917975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f0c0fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1620897440664!5m2!1sen!2sin" 
          allowFullScreen="" 
          loading="lazy">
        </MapIframe>
      </MapSection>
    </Container>
  );
};

export default FAQ;
