import ArticleCard from "./ArticleCard";

const TrendingArticles = ({ allNews }) => {
  return (
    <div className="py-16">
      <h2 className="text-2xl font-semibold text-center">Trending Articles</h2>

      <div className="flex items-center justify-center mt-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {allNews.slice(4, 10).map((news) => {
            return <ArticleCard key={news._id} news={news} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingArticles;
