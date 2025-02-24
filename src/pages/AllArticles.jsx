import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { NewsContext } from "../context/NewsProvider";
// import ArticleCard from "../components/TrendingArticles/ArticleCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { FiAward, FiBookmark, FiClock } from "react-icons/fi";

// Modern Article Card Component
const ArticleCard = ({ news, index }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const email = user?.email;

  const { data: currentUser = [] } = useQuery({
    queryKey: ["users", email],
    queryFn: async () => {
      if (!email) return null;
      const res = await axiosPublic.get(`/single-user/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // Function to format date (assuming news has a publishedAt field)
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="relative overflow-hidden">
        {news.isPremium && (
          <div className="absolute top-3 right-3 z-10">
            <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              <FiAward className="w-3 h-3" />
              PREMIUM
            </span>
          </div>
        )}
        <Link to={`/news/${news._id}`} className="block aspect-video">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
          <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-md">
            {news.category}
          </span>
        </div>
      </div>

      <div className="flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <FiClock className="mr-1" />
            {formatDate(news.publishedAt)}
          </div>
          <span>•</span>
          <div className="flex items-center">
            <FiBookmark className="mr-1" />5 min read
          </div>
        </div>

        <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {news.title}
        </h3>

        <p className="text-gray-600 text-sm mb-5 line-clamp-3">
          {news?.content?.slice(0, 150)}...
        </p>

        <div className="mt-auto">
          {news?.isPremium ? (
            <Link
              to={`/news/${news._id}`}
              className={`inline-block px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                currentUser?.isPremium
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentUser?.isPremium
                ? "Read Premium Article"
                : "Premium Content"}
            </Link>
          ) : (
            <Link
              to={`/news/${news._id}`}
              className="inline-block px-6 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-md"
            >
              Read Article
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const AllArticles = () => {
  const { allNews, updateFilters } = useContext(NewsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    updateFilters({ searchTerm: event.target.value });
  };

  const handlePublisherChange = (event) => {
    setSelectedPublisher(event.target.value);
    updateFilters({ selectedPublisher: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    updateFilters({ selectedCategory: event.target.value });
  };

  const filteredNews = allNews.filter((news) => news.status === "active");

  const { data: publisherOptions = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data.map((item) => ({ value: item.name, label: item.name }));
    },
  });

  return (
    <div className="container mx-auto">
      <div className="py-16">
        <h2 className="text-2xl font-semibold text-center">All Articles</h2>

        <div className="flex max-w-2xl gap-5 mx-auto mt-8">
          <label className="flex items-center gap-2 input input-bordered">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <select
            className="w-full max-w-xs select select-bordered"
            value={selectedPublisher}
            onChange={handlePublisherChange}
          >
            <option value="">All Publishers</option>
            {publisherOptions.map((options, idx) => {
              return (
                <option key={idx} value={options.value}>
                  {options.label}
                </option>
              );
            })}
          </select>
          <select
            className="w-full max-w-xs select select-bordered"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">All Category</option>
            <option value="Business">Business</option>
            <option value="World">World</option>
            <option value="Technology">Technology</option>
            <option value="Environment">Environment</option>
            <option value="Culture">Culture</option>
            <option value="Science">Science</option>
            <option value="Travel">Travel</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Health">Health</option>
          </select>
        </div>

        <div className="flex items-center justify-center mt-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((news, idx) => (
              <ArticleCard key={news._id} news={news} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
