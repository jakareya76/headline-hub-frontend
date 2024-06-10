import React from "react";
import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ["single-user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/single-user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <div className="text-xl text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="my-20">
      <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          My Profile
        </h1>
        {currentUser ? (
          <div className="flex flex-col items-center">
            <img
              src={currentUser.image}
              alt={`${currentUser.name}'s profile`}
              className="object-cover w-32 h-32 mb-4 border-4 border-gray-300 rounded-full"
            />
            <div className="text-center">
              <p className="text-lg text-gray-700">
                <strong>Name:</strong> {currentUser.name}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p className="text-lg text-gray-700">
                <strong>ID:</strong> {currentUser._id}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">No user data available</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
