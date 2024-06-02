import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ArticleDetails = () => {
  const [article, setArticle] = useState({});
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const getSingleArticle = async () => {
      const res = await axiosPublic.get(`/news/${id}`);
      setArticle(res.data);
    };

    getSingleArticle();
  }, []);

  if (!article.title) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-100px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-auto mb-6"
      />
      <div className="flex justify-between mb-6 text-gray-600">
        <span>By {article.author}</span>
        <span>{new Date(article.date).toLocaleDateString()}</span>
        <span>{article.category}</span>
      </div>
      <div className="text-lg leading-relaxed">{article.content}</div>
    </div>
  );
};

export default ArticleDetails;
