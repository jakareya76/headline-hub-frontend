import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import { useState } from "react";

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (feedback) => {
    setFeedback(feedback);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFeedback(null);
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
                <th>Author</th>
                <th>Title</th>
                <th>Publisher</th>
                <th>Status</th>
                <th>isPremium</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myArticles.map((news, idx) => (
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
                  <td className="flex gap-1 mt-5">
                    <h4 className="mt-1">{news.status}</h4>
                    {news.feedback && (
                      <button
                        onClick={() => openModal(news.feedback)}
                        className="ml-2 btn btn-sm btn-primary"
                      >
                        Reason
                      </button>
                    )}
                  </td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <button
              onClick={closeModal}
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">Feedback!</h3>
            <p className="py-4">{feedback}</p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyArticles;
