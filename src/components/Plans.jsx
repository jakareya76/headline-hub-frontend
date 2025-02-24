import { Link } from "react-router-dom";

const Plans = () => {
  const planData = [
    {
      title: "Basic",
      price: "Free",
      features: [
        "Lifetime Access",
        "Unlimited Articles Read",
        "Comment Access",
        "Add Articles",
        "Publish 1 Article",
      ],
      popular: false,
    },
    {
      title: "Standard",
      price: "$15",
      features: [
        "Lifetime Access",
        "Unlimited Articles Read",
        "Comment Access",
        "Add Articles",
        "Publish 5 Articles",
      ],
      popular: true,
    },
    {
      title: "Premium",
      price: "$50",
      features: [
        "Lifetime Access",
        "Unlimited Articles Read",
        "Comment Access",
        "Add Articles",
        "Publish Unlimited Articles",
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Select the perfect plan to enhance your reading and writing
            experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {planData.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-2 border-blue-500 shadow-xl transform -translate-y-2"
                  : "bg-white text-gray-800 border border-gray-200 hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold uppercase tracking-wider text-gray-900 py-1 px-3 rounded-bl-lg">
                  Popular
                </div>
              )}

              <div className="p-8 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-sm opacity-80">/month</span>
                    )}
                  </div>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <svg
                          className={`w-5 h-5 ${
                            plan.popular ? "text-blue-200" : "text-blue-500"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="subscription"
                  className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-colors ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
