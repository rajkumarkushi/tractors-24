


import React, { useState } from "react";
import styled from 'styled-components';
      
const FAQSection = styled.div`
  padding: 40px 20px;
  background-color: #f5f5f5;
  margin-left: 40px;
  margin-right: 40px;
  // width:30vw;
`;

const FAQTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: left;
`;

const FAQCategory = styled.div`
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  margin-left: 20px;
  margin-right: 20px;
`;

const FAQCategoryTitle = styled.div`
  padding: 16px;
  // background-color: #FCD681;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const FAQQuestion = styled.div`
  padding: 16px;
  background-color: #fcd681;
  border-bottom: 10px solid white;
  border-top: 10px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 24px;
  margin-left: 10px;
  margin-right: 10px;
`;

const FAQAnswer = styled.div`
  padding: 16px;
  background-color: #feeecb;
  border-radius: 36px;
  border-bottom: 10px solid white;
  margin-left: 5px;
  margin-right: 5px;
`;

const ToggleIcon = styled.span`
  font-size: 24px;
`;

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenQuestion(null);
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    {
      category: "For Resellers",
      questions: [
        {
          question: "Why should I sell with Unneu.com?",
          answer: (
            <ul>
              <li>
                You can sell any form of sarees from the comfort of your home
                and can also be an aggregator to sell pre-owned sarees which get
                picked up from your doorstep at zero cost.
              </li>
              <li>
                You can get the visibility of being an authentic seller and sell
                from your own social store with products links generated to be
                shared across platforms for better reachability.
              </li>
              <li>
                You will get recognised for being a stellar seller based on your
                performance.
              </li>
              <li>
                You would be exposed to an easy and hassle free mode of selling
                with guaranteed payout at the end of every week.
              </li>
              <li>
                You can quote a competitive price for your sarees after building
                a sense of the market value of your products by comparing
                against the selling point of other resellers.
              </li>
            </ul>
          ),
        },
        {
          question: "Can I sell on other platforms while selling at Unneu.com?",
          answer: (
            <li>
              Yes you can sell on any other platform if exists while
              experiencing the maximum benefits with us .
            </li>
          ),
        },
        {
          question: "When and how do I get paid against my sales?",
          answer: (
            <li>
              You have to share your bank details with us and your sales
              proceeds would be transferred at the end of every week that is on
              Friday.
            </li>
          ),
        },
        {
          question: "Can my products get returned after I sell them?",
          answer: (
            <li>
              We don’t have any return policy however it’s subject to
              conditions. If the product does not live up to it’s quality
              standards or conditions as promised then it will be returned back
              to you from our warehouse.
            </li>
          ),
        },
        {
          question: "How do I know the service platform is authentic?",
          answer: (
            <li>
              We aim to build the first and the biggest seller ecosystem in
              India with respect to pre-owned products and each touchpoint in
              the process would be authenticated through system generated
              procedure and not through verbal verdicts. Any loss or theft in
              transition would be borne by the company .
            </li>
          ),
        },
      ],
    },
    {
      category: "For seller representatives",
      questions: [
        {
          question:
            "Why How do I become a seller representative with Unneu? I sell with Unneu.com?",
          answer: (
            <ul>
              <li>
                You can be a seller representative by launching resellers as
                part of the seller community at Unneu. Contact us at
                business@unneu.com to learn more about it.
              </li>
              <li>
                A reseller can also become other seller’s agent based on your
                willingness.
              </li>
            </ul>
          ),
        },
        {
          question:
            "Why What benefits do I get entitled to if I become a seller representative? I sell with Unneu.com?",
          answer: (
            <ul>
              <li>
                You get entitled to a joining bonus with each new joine and earn
                2% commission against each order generated through your
                introduced pool of resellers .
              </li>
              <li>
                You further earn 0.5% commission from sales proceeds of sellers
                being launched by your first pool of resellers and so on and so
                forth.
              </li>
            </ul>
          ),
        },
      ],
    },
    {
      category: "For Buyers",
      questions: [
        {
          question: "Why should I buy from Unneu.com?",
          answer: (
            <ul>
              <li>
                It is the first Indian aggregator of pre-owned sarees in India
                where you can buy from verified sellers by surfing products
                through the sellers stores.
              </li>
              <li>
                The product is subject to a through quality check before it is
                shipped to the final buyer so that expectations match reality.
              </li>
              <li>
                The product is handled through collaboration with a certified
                courier partner and any damage or mishandling in transition is
                taken care of by the company.
              </li>
            </ul>
          ),
        },
        {
          question: "What is the delivery timeline?",
          answer: (
            <ul>
              <li>
                Expect the products to be delivered within 7-10 working days.
              </li>
            </ul>
          ),
        },
        {
          question: "What are the cancellation and return policies?",
          answer: (
            <ul>
              <li>
                The order is subject to cancellation within two days from the
                date of placing an order.
              </li>
              <li>
                We don’t have any return policy. Once sold the product is non
                returnable however it is subject to conditions. If the product
                is damaged or torn and does not meet the quality/ condition as
                prescribed then we may take the product back
              </li>
            </ul>
          ),
        },
        {
          question: "What are the refund policies?",
          answer: (
            <ul>
              <li>
                The refund is remitted back within 7 working days from the date
                of return.
              </li>
            </ul>
          ),
        },
        {
          question: "How is the shipping cost calculated?",
          answer: (
            <ul>
              <li>You are expected to pay Rs.100/- against each order.</li>
            </ul>
          ),
        },
      ],
    },
  ];

  return (
    <FAQSection>
      <FAQTitle>Frequently Asked Question</FAQTitle>
      <p>Question commonly asked by Buyers and sellers</p>
      {faqData.map((category, categoryIndex) => (
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
                  <FAQAnswer>{item.answer}</FAQAnswer>
                )}
              </div>
            ))}
        </FAQCategory>
      ))}
    </FAQSection>
  );
};


export default FAQ;
