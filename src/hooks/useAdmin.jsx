import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setForbidden(false);
    }
  }, [user?.email]);

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery(
    [user?.email, "isAdmin"],
    async () => {
      try {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`);

        return res.data?.admin;
      } catch (error) {
        if (error.response?.status === 403) {
          setForbidden(true);
        }
        throw error;
      }
    },
    {
      enabled: !!user?.email && !loading && !forbidden,
      retry: false,
    }
  );

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
