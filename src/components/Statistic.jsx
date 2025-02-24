import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";
import { FiUsers, FiUser, FiAward } from "react-icons/fi";

const StatCard = ({ title, value, icon, color, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is visible in the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl shadow-lg py-8 px-6 flex flex-col items-center transition-transform duration-500 transform hover:scale-105 ${color}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white opacity-10 rounded-full"></div>
      <div className="mb-4 text-white p-4 rounded-full bg-white/20 backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <div className="text-5xl font-bold text-white">
        {isVisible ? <CountUp start={0} end={value} duration={2.5} /> : "0"}
      </div>
    </div>
  );
};

const Statistic = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
            Our Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Headline Hub in Numbers
          </h2>
          <p className="max-w-2xl mx-auto text-blue-100">
            Join our growing community of readers and publishers who trust
            Headline Hub for quality news and information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            title="Total Users"
            value={431}
            icon={<FiUsers className="w-8 h-8" />}
            color="bg-blue-500"
            delay={0}
          />
          <StatCard
            title="Regular Readers"
            value={379}
            icon={<FiUser className="w-8 h-8" />}
            color="bg-indigo-600"
            delay={200}
          />
          <StatCard
            title="Premium Subscribers"
            value={175}
            icon={<FiAward className="w-8 h-8" />}
            color="bg-purple-600"
            delay={400}
          />
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg">
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
