import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../context/NewsProvider";
import ArticleCard from "../components/TrendingArticles/ArticleCard";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AllArticles = () => {
  const { allNews } = useContext(NewsContext);

  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);

  const axiosPublic = useAxiosPublic();

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     const res = await axiosPublic.get("/news", {
  //       params: {
  //         search: searchTerm,
  //         publisher: selectedPublisher,
  //         tags: selectedTags,
  //         status: "active",
  //       },
  //     });
  //     setArticles(res.data);
  //     console.log(res);
  //   };

  //   fetchArticles();
  // }, [searchTerm, selectedPublisher, selectedTags]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setSelectedPublisher(event.target.value);
  };

  const handleTagChange = (event) => {
    const selected = event.target.value;
    setSelectedTags(selected);
  };

  const filteredNews = allNews.filter((news) => news.status === "active");

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
            <option selected disabled>
              All Publishers
            </option>
            <option>Publishers One</option>
            <option>Publishers Tow</option>
            <option>Publishers Three</option>
          </select>
          <select
            className="w-full max-w-xs select select-bordered"
            onChange={handleTagChange}
            value={selectedTags}
          >
            <option selected disabled>
              All Tags
            </option>
            <option>Tags One</option>
            <option>Tags Tow</option>
            <option>Tags Three</option>
          </select>
        </div>

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
