import { Link } from "react-router-dom";

const ArticleCard = ({ news }) => {
  return (
    <div className="shadow-xl card w-96 bg-base-100">
      <figure>
        <img src={news.image} alt="Shoes" />
      </figure>

      <div className="card-body">
        <div className="badge badge-outline">{news.category}</div>
        <h2 className="card-title">{news.title} </h2>
        <p>{news?.content?.slice(0, 115)}...</p>
        <Link to={`/news/${news._id}`} className="px-8 btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
