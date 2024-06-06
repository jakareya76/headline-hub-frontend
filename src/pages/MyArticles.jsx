import { useContext } from "react";
import { NewsContext } from "../context/NewsProvider";
import ArticleCard from "../components/TrendingArticles/ArticleCard";
import useAuth from "../hooks/useAuth";

const MyArticles = () => {
  const { allNews } = useContext(NewsContext);
  const { user } = useAuth();
  const myArticles = allNews.filter((news) => news.email === user?.email);

  return (
    <div className="container mx-auto">
      <div className="py-16">
        <h2 className="text-2xl font-semibold text-center">My Articles</h2>

        <div className="flex items-center justify-center mt-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {myArticles.map((news) => (
              <ArticleCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyArticles;
