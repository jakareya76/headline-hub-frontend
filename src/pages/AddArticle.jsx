import { useForm } from "react-hook-form";
import Select from "react-select";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const options = [
  { value: "Health", label: "Health" },
  { value: "Sports", label: "Sports" },
  { value: "Politics", label: "Politics" },
  { value: "Travel", label: "Travel" },
  { value: "Science", label: "Science" },
  { value: "Culture", label: "Culture" },
  { value: "Environment", label: "Environment" },
  { value: "Technology", label: "Technology" },
  { value: "Business", label: "Business" },
  { value: "World", label: "World" },
];

const AddArticle = () => {
  const [selectedOption, setSelectedOption] = useState(null);

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
        category: selectedOption.value,
        content: data.content,
        image: img_url,
        author: author,
        email: user?.email,
        date: new Date().toLocaleDateString(),
        isPending: true,
        isPremium: false,
      });

      if (result.data.insertedId) {
        reset();
        toast.success("Article Added in Pending Wait For Admin To Approve");
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

          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            className="my-1"
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
