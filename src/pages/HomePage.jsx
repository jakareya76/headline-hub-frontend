import { useQuery } from "react-query";
import Banner from "../components/Banner/Banner";
import TrendingArticles from "../components/TrendingArticles/TrendingArticles";
import Statistic from "../components/Statistic";
import Plans from "../components/Plans";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AllPublishers from "../components/AllPublishers";
import Faq from "../components/Faq";

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
      <AllPublishers />
      <Statistic />
      <Plans />
      <Faq />
    </div>
  );
};

export default HomePage;
