import { createContext } from "react";
import { useQuery } from "react-query";

import useAxiosPublic from "../hooks/useAxiosPublic";

export const NewsContext = createContext();

const NewsProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();

  const { data: allNews = [], refetch } = useQuery({
    queryKey: ["all-news"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-news");
      return res.data;
    },
  });

  return (
    <NewsContext.Provider value={{ allNews, refetch }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
