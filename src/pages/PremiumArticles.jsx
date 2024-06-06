import { useContext } from "react";
import ArticleCard from "../components/TrendingArticles/ArticleCard";
import { NewsContext } from "../context/NewsProvider";

const PremiumArticles = () => {
  const { allNews } = useContext(NewsContext);

  const premiumNews = allNews.filter((news) => news.isPremium);

  return (
    <div className="container mx-auto">
      <div className="py-16">
        <h2 className="text-2xl font-semibold text-center">Premium Articles</h2>

        <div className="flex items-center justify-center mt-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {premiumNews.map((news) => (
              <ArticleCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumArticles;
