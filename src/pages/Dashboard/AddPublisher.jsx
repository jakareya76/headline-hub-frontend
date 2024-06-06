import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_url, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const img_url = res.data.data.display_url;

    const publisher_info = { name: data.name, image: img_url };

    if (res.data.success) {
      const result = await axiosSecure.post("/publishers", { publisher_info });

      if (result.data.insertedId) {
        reset();
        toast.success("Publisher Added Successfully");
      }
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
    </div>
  );
};

export default AddPublisher;
