import React, { useState } from "react";
import "./FaqComp.css";

const FaqComp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the best time to travel?",
      answer: "The best time to travel depends on your destination and preferences. Generally, spring and fall offer pleasant weather and fewer crowds.",
    },
    {
      question: "How do I book a trip?",
      answer: "You can book a trip through our website or by contacting our customer service team. We offer various packages and customization options.",
    },
    {
      question: "What are the payment options?",
      answer: "We accept various payment options including credit cards, debit cards, and online payment methods.",
    },
    {
      question: "Can I cancel or change my booking?",
      answer: "Yes, you can cancel or change your booking. Please refer to our cancellation policy for more details.",
    },
    {
      question: "Do you offer travel insurance?",
      answer: "Yes, we offer comprehensive travel insurance to ensure your trip is safe and secure.",
    },
    {
      question: "What should I pack for my trip?",
      answer: "Packing essentials depend on your destination. We recommend packing comfortable clothing, necessary documents, and any personal items you may need.",
    },
  ];

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Need Help?</h1>
        <p>Find answers to your questions below</p>
      </div>
      <div className="faq-content">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleAnswer(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle">{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
        <div className="contact-section">
          <p>Still have questions?</p>
          <button>Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default FaqComp;
