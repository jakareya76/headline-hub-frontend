import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useState } from "react";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      setAllUsers(res.data);
      return res.data;
    },
  });

  const handleMakeAdmin = async (user) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${user._id}`);

      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Admin Created Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="py-5">
      <h2 className="my-10 text-3xl font-semibold">Manage Users</h2>
      <div className="flex items-center justify-center">
        <div className="w-full p-4 mt-5 border rounded">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">
              Total Users: {users?.length}
            </h2>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user) => {
              return (
                <tr key={user._id}>
                  <th>
                    <img
                      src={user.image}
                      alt="user"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </th>

                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="text-white btn w-[250px] btn-success ">
                        <MdAdminPanelSettings /> Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="text-white btn w-[250px] btn-success "
                      >
                        <FaUsers />
                        {user?.isPremium ? "Premium USER" : "Normal USER"} |
                        Make Admin
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-white btn btn-error "
                    >
                      <MdDelete /> Delete
                    </button>
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

export default AllUsers;
