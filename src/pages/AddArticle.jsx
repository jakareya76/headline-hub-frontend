import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticle = () => {
  const { handleSubmit, register, reset } = useForm();
  const { user } = useAuth();
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
    const author = user?.displayName;

    if (res.data.success) {
      const result = await axiosSecure.post("/news", {
        title: data.title,
        category: data.category,
        content: data.content,
        image: img_url,
        author: author,
        email: user?.email,
        date: new Date().toLocaleDateString(),
      });

      if (result.data.insertedId) {
        reset();
        toast.success("Successfully Added Article");
      }
    }
  };

  return (
    <section className="py-20">
      <h2 className="mb-10 text-3xl font-semibold text-center">Add Article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="title"
            className="input input-bordered"
            {...register("title", { required: true })}
          />
          <input
            type="text"
            placeholder="category"
            className="input input-bordered"
            {...register("category", { required: true })}
          />
          <textarea
            type="text"
            placeholder="content"
            className="col-span-2 textarea textarea-bordered"
            {...register("content", { required: true })}
          />
          <input
            type="file"
            className="w-full max-w-xs file-input file-input-bordered"
            {...register("image", { required: true })}
          />
        </div>
        <button className="w-full my-5 btn btn-primary">Add Article</button>
      </form>
    </section>
  );
};

export default AddArticle;
