import { createContext, useState } from "react";
import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const NewsContext = createContext();

const NewsProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedPublisher: "",
    selectedCategory: "",
  });

  const { data: allNews = [], refetch } = useQuery({
    queryKey: ["all-news", filters],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-news", {
        params: {
          search: filters.searchTerm,
          publisher: filters.selectedPublisher,
          category: filters.selectedCategory,
          status: "active",
        },
      });
      return res.data;
    },
  });

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    refetch();
  };

  return (
    <NewsContext.Provider value={{ allNews, updateFilters, refetch }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
