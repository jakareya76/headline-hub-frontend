import { useContext } from "react";
import Banner from "../components/Banner/Banner";
import TrendingArticles from "../components/TrendingArticles/TrendingArticles";
import { NewsContext } from "../context/NewsProvider";
import Statistic from "../components/Statistic";

const HomePage = () => {
  const { allNews } = useContext(NewsContext);

  return (
    <div className="container mx-auto">
      <Banner allNews={allNews} />
      <TrendingArticles allNews={allNews} />
      <Statistic />
    </div>
  );
};

export default HomePage;
