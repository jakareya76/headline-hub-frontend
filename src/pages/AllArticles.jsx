import { useContext } from "react";
import { NewsContext } from "../context/NewsProvider";
import ArticleCard from "../components/TrendingArticles/ArticleCard";

const AllArticles = () => {
  const { allNews } = useContext(NewsContext);

  const filteredNews = allNews.filter((news) => !news.isPending);

  return (
    <div className="container mx-auto">
      <div className="py-16">
        <h2 className="text-2xl font-semibold text-center">All Articles</h2>

        <div className="flex items-center justify-center mt-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((news) => {
              return <ArticleCard key={news._id} news={news} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
