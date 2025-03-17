import { useState } from "react";
import "../../styles/sections/Faq.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Question goes here",
      answer:
        "This is the answer to this question. This is the answer to this question. This is the answer to this question.",
    },
    {
      question: "Question goes here",
      answer:
        "This is the answer to this question. This is the answer to this question. This is the answer to this question.",
    },
    {
      question: "Question goes here",
      answer:
        "This is the answer to this question. This is the answer to this question. This is the answer to this question.",
    },
    {
      question: "Question goes here",
      answer:
        "This is the answer to this question. This is the answer to this question. This is the answer to this question.",
    },
    {
      question: "Question goes here",
      answer:
        "This is the answer to this question. This is the answer to this question. This is the answer to this question.",
    },
    {
      question: "Question goes here",
      answer:
        "This is the answer to this question. This is the answer to this question. This is the answer to this question.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-items">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
