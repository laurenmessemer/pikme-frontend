import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is PikMe?",
      answer: [
        "PikMe is a competitive platform designed for anyone to monetize their content without needing a large following or figuring out social media algorithms.",
        "You submit your photos and receive votes from other users to win matchups versus other users. The more matchups you win each week, the higher the prize you can earn!",
      ],
    },
    {
      question: "Who is this for?",
      answer: [
        "PikMe is a platform for anyone who has photos they want to share—and based on social media, it’s a lot of you!",
        "No need to be a professional photographer or influencer. As long as you have photos and want to earn money, PikMe is for you!",
      ],
    },
    {
      question: "Do I need experience as a photographer to play?",
      answer: [
        "Nope! Anyone with photos to share can play PikMe.",
        "Regardless of your experience level, each photo gets the same chance to win.",
      ],
    },
    {
      question: "What makes PikMe different?",
      answer: [
        "PikMe focuses on getting creatives paid regardless of experience or following.",
        "All that matters in our contests is how good your photos are.",
        "With PikMe, you’re just as likely to win as your favorite photographers and influencers!",
      ],
    },
    {
      question: "How do I win?",
      answer: [
        "When you submit a photo, it will be matched up against 1 other photo in a head-to-head matchup. Yours and the other photo will be shown to voters, and the photo that receives the most votes will win that matchup.",
        "We also look at how much you won by. Every week, the users who win their head-to-head matchups with the highest margins will win the Jackpot prize.",
        "Additionally, we reward users who vote the most and refer the most friends each week.",
      ],
    },
    {
      question: "What can I win?",
      answer: [
        "While you’re learning how to play PikMe, you’ll win tokens so you can keep playing and hone your skills.",
        "Soon, PikMe will be introducing real cash prizes for winners of weekly Jackpots!",
      ],
    },
    {
      question: "I ran out of tokens. How can I keep playing PikMe?",
      answer: [
        "You can earn more tokens by winning your matchups and referring new users.",
        "Additionally, you can win bonus tokens each week by referring the most friends or casting the most votes.",
      ],
    },
    {
      question: "Will you take the rights to my photos?",
      answer: [
        "No. PikMe believes photos should remain the work of the photographer, and we only want to help creators monetize their content.",
        "We may ask you for permission to use your photo in promotional material, but you would still retain the rights to your photo.",
      ],
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
              <span className="faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
