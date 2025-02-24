import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FiExternalLink } from "react-icons/fi";
import { useState } from "react";

const AllPublishers = () => {
  const axiosPublic = useAxiosPublic();
  const [hoveredId, setHoveredId] = useState(null);

  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <span className="text-blue-600 font-medium text-sm uppercase tracking-wider mb-2">
            Our Network
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-center relative pb-4">
            Trusted Publishers
            <span className="block h-1 w-20 bg-blue-600 mt-4 mx-auto rounded-full"></span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mt-4">
            Discover our network of reputable publishers bringing you the most
            reliable and engaging news content
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {publishers.map((publisher) => (
              <div
                key={publisher._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                onMouseEnter={() => setHoveredId(publisher._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative p-6 flex items-center justify-center h-48 bg-gray-50">
                  <img
                    src={publisher.image}
                    alt={`${publisher.name} logo`}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <div
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300 ${
                      hoveredId === publisher._id ? "opacity-100" : ""
                    }`}
                  >
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      <span>Visit Publisher</span>
                      <FiExternalLink />
                    </button>
                  </div>
                </div>

                <div className="p-5 border-t">
                  <h3 className="font-semibold text-lg text-center group-hover:text-blue-600 transition-colors">
                    {publisher.name}
                  </h3>
                  {publisher.description && (
                    <p className="text-gray-600 text-sm text-center mt-2 line-clamp-2">
                      {publisher.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPublishers;
