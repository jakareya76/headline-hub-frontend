import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../context/NewsProvider";
import ArticleCard from "../components/TrendingArticles/ArticleCard";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllArticles = () => {
  const [publisherOptions, setPublisherOptions] = useState([]);
  const { allNews, updateFilters } = useContext(NewsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    updateFilters({ searchTerm: event.target.value });
  };

  const handlePublisherChange = (event) => {
    setSelectedPublisher(event.target.value);
    updateFilters({ selectedPublisher: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    updateFilters({ selectedCategory: event.target.value });
  };

  const filteredNews = allNews.filter((news) => news.status === "active");

  useEffect(() => {
    const getPublishersName = async () => {
      const res = await axiosSecure.get("/publishers");

      const options = [];

      res.data.map((item) => {
        const option = { value: item.name, label: item.name };
        options.push(option);
      });

      setPublisherOptions(options);
    };

    getPublishersName();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="py-16">
        <h2 className="text-2xl font-semibold text-center">All Articles</h2>

        <div className="flex max-w-2xl gap-5 mx-auto mt-8">
          <label className="flex items-center gap-2 input input-bordered">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <select
            className="w-full max-w-xs select select-bordered"
            value={selectedPublisher}
            onChange={handlePublisherChange}
          >
            <option value="">All Publishers</option>
            {publisherOptions.map((options, idx) => {
              return (
                <option key={idx} value={options.value}>
                  {options.label}
                </option>
              );
            })}
          </select>
          <select
            className="w-full max-w-xs select select-bordered"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">All Category</option>
            <option value="Business">Business</option>
            <option value="World">World</option>
            <option value="Technology">Technology</option>
            <option value="Environment">Environment</option>
            <option value="Culture">Culture</option>
            <option value="Science">Science</option>
            <option value="Travel">Travel</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Health">Health</option>
          </select>
        </div>

        <div className="flex items-center justify-center mt-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((news) => (
              <ArticleCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
