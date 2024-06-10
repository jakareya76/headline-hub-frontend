import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "react-query";

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allNews = [], refetch } = useQuery({
    queryKey: ["my-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-news");
      return res.data;
    },
  });

  const myArticles = allNews.filter((news) => news.email === user?.email);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/news/${id}`);

        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="py-16">
        <h2 className="mb-10 text-2xl font-semibold text-center">
          My Articles
        </h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>*No</th>
                <th>Image</th>
                <th>author</th>
                <th>title</th>
                <th>publisher</th>
                <th>status</th>
                <th>isPremium</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myArticles.map((news, idx) => {
                return (
                  <tr key={news._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <img
                        src={news.image}
                        alt="image"
                        className="w-[60px] rounded"
                      />
                    </td>
                    <td>{news.author}</td>
                    <td>{news.title}</td>
                    <td>{news.publisher}</td>
                    <td>{news.status}</td>
                    <td>{news.isPremium ? "Yes" : "No"}</td>
                    <td className="flex gap-4">
                      <Link
                        to={`/news/${news._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/update-article/${news._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(news._id)}
                        className="text-white btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyArticles;
