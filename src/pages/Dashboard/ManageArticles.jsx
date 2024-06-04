import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Modal from "react-modal";
import { useState } from "react";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ManageArticles = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [declineId, setDeclineId] = useState("");

  const axiosSecure = useAxiosSecure();

  const { refetch, data: articles = [] } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-news");
      return res.data;
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleApprove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/approve-news/${id}`);

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Completed!",
            text: "News Has Been Approve.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleDecline = (id) => {
    setDeclineId(id);
    openModal();
  };

  const handleGiveFeedback = async (event) => {
    event.preventDefault();

    const feedback = event.target.feedback.value;

    const res = await axiosSecure.patch(`/decline-feedback/${declineId}`, {
      feedback,
    });

    if (res.data.modifiedCount > 0) {
      refetch();
      closeModal();
      toast("Successfully decline Article!");
    }
  };

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
            text: "news has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleMakePremium = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make it Premium!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/news-make-premium/${id}`);

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Completed!",
            text: "News Has Been Premium.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="py-5">
        <h2 className="my-10 text-3xl font-semibold">Manage Users</h2>
        <div className="flex items-center justify-center">
          <div className="w-full p-4 mt-5 border rounded">
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold">Total Articles: 0</h2>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Article Photo</th>
                <th>Article title</th>
                <th>Author name</th>
                <th>Author email</th>
                <th>Posted Date</th>
                <th>Status</th>
                <th>Publisher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                const isPending = article.status === "pending" ? true : false;
                const isDecline = article.status === "decline" ? true : false;
                const isPremium = article.isPremium ? true : false;
                return (
                  <tr key={article._id}>
                    <th>
                      <img
                        src={article.image}
                        alt="user"
                        className="w-[40px] h-[40px]"
                      />
                    </th>

                    <th className="text-xs">{article.title}</th>
                    <th className="text-xs">{article.author}</th>
                    <th className="text-xs">{article.email}</th>
                    <th className="text-xs">{article.date}</th>
                    <th className="text-xs">{article.status}</th>
                    <th className="text-xs">Publisher Coming soon</th>

                    <th className="grid grid-cols-3 gap-1">
                      {isPending ? (
                        <>
                          <button
                            onClick={() => handleApprove(article._id)}
                            className="col-span-2 text-white btn btn-sm btn-success "
                          >
                            approve
                          </button>
                          <button
                            onClick={() => handleDecline(article._id)}
                            className="text-white btn btn-sm btn-warning "
                          >
                            decline
                          </button>
                        </>
                      ) : (
                        <>
                          {!isDecline &&
                            (isPremium ? (
                              <button className="flex col-span-2 text-xs text-white btn btn-sm btn-primary">
                                premium
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMakePremium(article._id)}
                                className="flex col-span-2 text-xs text-white btn btn-sm btn-primary"
                              >
                                make premium
                              </button>
                            ))}

                          <button
                            onClick={() => handleDelete(article._id)}
                            className="text-white btn btn-sm btn-error "
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="mb-3 text-xl font-semibold">Feedback</h2>
        <form onSubmit={handleGiveFeedback}>
          <textarea
            type="text"
            placeholder="reason for decline"
            name="feedback"
            className="w-full textarea textarea-bordered"
          />
          <button className="w-full btn btn-primary">Give Feedback</button>
        </form>
      </Modal>
    </>
  );
};

export default ManageArticles;
