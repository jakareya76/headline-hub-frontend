import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ArticleCard = ({ news }) => {
  const axiosPublic = useAxiosPublic();

  const { user } = useAuth();
  const email = user?.email;

  const { data: currentUser = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/single-user/${email}`);
      return res.data;
    },
  });

  return (
    <div
      className={`shadow-xl card w-96 bg-base-100 ${
        news.isPremium && "border-b-4 border-orange-500"
      }`}
    >
      <figure>
        <img src={news.image} alt="Shoes" className="w-full h-[250px]" />
      </figure>

      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="badge badge-outline">{news.category}</div>
          {news.isPremium && (
            <div className="p-3 text-white bg-orange-500 border-orange-500 badge badge-outline">
              Premium
            </div>
          )}
        </div>
        <h2 className="card-title">{news.title} </h2>
        <p>{news?.content?.slice(0, 115)}...</p>
        {news?.isPremium ? (
          <Link
            to={`/news/${news._id}`}
            className={`px-8 btn ${
              currentUser?.isPremium ? "btn-active btn-warning" : "btn-disabled"
            } btn`}
          >
            Read Premium News
          </Link>
        ) : (
          <Link to={`/news/${news._id}`} className="px-8 btn btn-primary">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
