import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AllPublishers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  return (
    <div className="py-20">
      <h2 className="text-3xl font-semibold text-center">All Publishers</h2>
      <div className="flex items-center justify-center my-8">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {publishers.map((publisher) => {
            return (
              <div key={publisher._id} className="p-2 rounded bg-zinc-300">
                <img
                  src={publisher.image}
                  alt="logo"
                  className="w-[300px] p-5 h-[250px] object-fill"
                />
                <h2 className="text-xl font-semibold text-center">
                  {publisher.name}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllPublishers;
