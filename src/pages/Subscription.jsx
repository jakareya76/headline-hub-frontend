import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const SubscriptionPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: currentUser = {} } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-user/${user?.email}`);
      return res.data;
    },
  });

  if (currentUser.isPremium) {
    return (
      <div
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
        className="relative flex items-center justify-center w-full h-screen mb-2 bg-no-repeat bg-cover rounded-xl"
      >
        <div className="w-full h-full bg-[#00000075] absolute"></div>
        <h2 className="z-50 text-4xl font-bold text-center text-white ">
          Your Already Premium User
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      <div
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
        className="w-full flex items-center justify-center relative h-[300px] bg-no-repeat bg-cover"
      >
        <div className="w-full h-full bg-[#00000075] absolute"></div>
        <h2 className="z-50 text-4xl font-bold text-center text-white ">
          Become A Premium User
        </h2>
      </div>
      <h2 className="my-10 text-2xl font-semibold text-center">Get Premium</h2>
      <div className="flex flex-wrap items-center justify-center gap-10">
        <div>
          <div className="h-[350px] text-white bg-gray-800 shadow-xl card w-96">
            <div className="card-body">
              <h2 className="card-title">Premium Plan (50$)</h2>
              <ul className="my-5 ml-5 space-y-3 list-disc">
                <li>Life Time Access</li>
                <li>Unlimited Articles Read</li>
                <li>Comment Access</li>
                <li>Add Articles</li>
                <li>Post unlimited articles</li>
              </ul>
              <Link to={`/payment/${50}`} className="btn btn-primary">
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
