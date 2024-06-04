import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { MdDelete } from "react-icons/md";

const ManageArticles = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: articles = [] } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-news");
      return res.data;
    },
  });

  return (
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
            {articles.map((article, idx) => {
              const isPending = article.status === "pending" ? true : false;

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
                        <button className="col-span-2 text-white btn btn-sm btn-success ">
                          approve
                        </button>
                        <button className="text-white btn btn-sm btn-warning ">
                          decline
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex col-span-2 text-xs text-white btn btn-sm btn-primary ">
                          make premium
                        </button>
                        <button className="text-white btn btn-sm btn-error ">
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
  );
};

export default ManageArticles;
