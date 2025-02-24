import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FiClock, FiBookmark, FiAward } from "react-icons/fi";

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

// Main Trending Articles Component
const TrendingArticles = ({ allNews }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-12">
          <span className="text-blue-600 font-medium text-sm uppercase tracking-wider mb-2">
            Stay informed
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-center relative pb-4">
            Trending Articles
            <span className="block h-1 w-20 bg-blue-600 mt-4 mx-auto rounded-full"></span>
          </h2>
          <p className="text-gray-600 text-center max-w-xl mt-4">
            Discover our most popular stories and stay updated with the latest
            news and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allNews.slice(4, 10).map((news, index) => (
            <ArticleCard key={news._id} news={news} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingArticles;
