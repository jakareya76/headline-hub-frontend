import { useState } from "react";
import faqImg from "../assets/faq.svg";
import { motion } from "framer-motion";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is HeadlineHub?",
      answer:
        "HeadlineHub is your go-to source for the latest news and trending articles from a variety of publishers. Our platform offers a diverse range of news topics to keep you informed and up-to-date.",
    },
    {
      question: "How do I subscribe to premium content?",
      answer:
        "To subscribe, navigate to the subscription page, select your preferred period, and complete payment via Stripe. Once the subscription ends, your account will revert to a regular user.",
    },
    {
      question: "How is my subscription period tracked?",
      answer:
        "We track it by updating the premiumTaken property in your profile with the subscription start date and duration. Your status updates automatically upon logging in.",
    },
    {
      question: "How do I filter articles by publisher or tags?",
      answer:
        "Use the search bar, publisher dropdown, or tag filters on the All Articles page to dynamically update your article feed.",
    },
    {
      question: "How can I view the publication statistics?",
      answer:
        "Access the Admin page to view a dynamic pie chart displaying article distribution across publishers.",
    },
  ];

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-16 py-20 px-5 bg-gradient-to-b from-white to-gray-100 md:flex-row">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2"
      >
        <img src={faqImg} alt="FAQ" className="rounded-2xl shadow-lg" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col w-full gap-5 md:w-1/2"
      >
        <h2 className="text-3xl font-bold text-center md:text-left">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-indigo-600 text-white rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-lg font-medium"
              >
                {item.question}
                <span>
                  {activeIndex === index ? (
                    <span>&#9650;</span> // Up Arrow
                  ) : (
                    <span>&#9660;</span> // Down Arrow
                  )}
                </span>
              </button>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-4 text-gray-200"
                >
                  {item.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Faq;
