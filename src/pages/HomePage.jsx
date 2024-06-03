import { useContext } from "react";
import Banner from "../components/Banner/Banner";
import TrendingArticles from "../components/TrendingArticles/TrendingArticles";
import { NewsContext } from "../context/NewsProvider";
import Statistic from "../components/Statistic";
import Plans from "../components/Plans";

const HomePage = () => {
  const { allNews } = useContext(NewsContext);

  return (
    <div>
      <Banner allNews={allNews} />
      <TrendingArticles allNews={allNews} />
      <Statistic />
      <Plans />
    </div>
  );
};

export default HomePage;
