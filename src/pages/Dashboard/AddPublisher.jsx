import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_url, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);

    const img_url = res.data.data.display_url;

    console.log(img_url);

    const publisher_info = { name: data.name, image: img_url };

    if (res.data.success) {
      await axiosSecure.post("/publishers", publisher_info);
      toast.success("Publisher Added Successfully");
      reset();
      refetch();
    }
  };

  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/publishers/${id}`);

    if (res.data.deletedCount > 0) {
      refetch();
      toast("Publisher Deleted Successfully");
    }
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold text-center">Add A Publisher</h2>
      <div className="flex items-center justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 mt-8">
            <input
              type="text"
              placeholder="Publisher Name"
              className="w-full max-w-xs input input-bordered"
              {...register("name", { required: true })}
            />
            <input
              type="file"
              className="w-full max-w-xs file-input file-input-bordered"
              {...register("image", { required: true })}
            />
          </div>
          <button type="submit" className="w-full mt-5 btn btn-primary">
            Add Publisher
          </button>
        </form>
      </div>

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
                  <button
                    onClick={() => handleDelete(publisher._id)}
                    className="w-full mt-4 text-white btn btn-error"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPublisher;
