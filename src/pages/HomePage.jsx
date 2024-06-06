import { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import TrendingArticles from "../components/TrendingArticles/TrendingArticles";
import Statistic from "../components/Statistic";
import Plans from "../components/Plans";
import useAxiosSecure from "../hooks/useAxiosSecure";

const HomePage = () => {
  const [allNews, setAllNews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const getAllNewsData = async () => {
      const res = await axiosSecure.get("/all-news");
      setAllNews(res.data);
    };

    getAllNewsData();
  }, []);

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
