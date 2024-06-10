import { useState } from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateArticle = () => {
  const { handleSubmit, register, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  const { data: article = [] } = useQuery({
    queryKey: ["single-article"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/news/${id}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const updateArticle = { title: data.title, content: data.content };

    const res = await axiosSecure.patch(
      `/update-news/${article._id}`,
      updateArticle
    );

    if (res.data.modifiedCount > 0) {
      toast.success("Update Successfull");
    }
  };

  return (
    <section className="px-5 py-20">
      <h2 className="mb-10 text-3xl font-semibold text-center">
        Update Article
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="title"
            className="col-span-2 input input-bordered"
            {...register("title", { required: true })}
            defaultValue={article.title}
          />

          <Select placeholder={article.category} className="my-1" isDisabled />
          <Select className="my-1" placeholder={article.publisher} isDisabled />
          <textarea
            type="text"
            placeholder="content"
            className="col-span-2 textarea textarea-bordered"
            {...register("content", { required: true })}
            defaultValue={article.content}
          />
          <input
            type="file"
            className="w-full max-w-xs file-input file-input-bordered"
            disabled
          />
        </div>
        <button className="w-full my-5 btn btn-primary">Add Article</button>
      </form>
    </section>
  );
};

export default UpdateArticle;
