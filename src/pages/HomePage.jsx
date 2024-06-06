import { useQuery } from "react-query";
import Banner from "../components/Banner/Banner";
import TrendingArticles from "../components/TrendingArticles/TrendingArticles";
import Statistic from "../components/Statistic";
import Plans from "../components/Plans";
import useAxiosSecure from "../hooks/useAxiosSecure";

const HomePage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allNews = [] } = useQuery({
    queryKey: ["all-news"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-news");
      return res.data;
    },
  });

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
