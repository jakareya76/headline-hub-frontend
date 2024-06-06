import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import useAuth from "../hooks/useAuth";
import authImage from "../assets/auth.svg";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const [togglePassword, settogglePassword] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { signUp, user, signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_url, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const img_url = res.data.data.display_url;

    if (res.data.success) {
      try {
        await signUp(data.email, data.password);
        await updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: img_url,
        });

        toast.success("Sign Up Successfull");

        const userInfo = {
          name: data.name,
          email: data.email,
          image: img_url,
        };

        const res = await axiosPublic.post("/users", userInfo);

        if (res.data.insertedId) {
          navigate("/");
          reset();
        }
        navigate("/");
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  if (user) {
    return navigate("/");
  }

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col gap-10 hero-content lg:flex-row">
        <div className="text-center lg:text-left">
          <img src={authImage} alt="auth" />
        </div>
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: true })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={togglePassword ? "password" : "text"}
                  name="password"
                  placeholder="password"
                  className="w-full input input-bordered"
                  {...register("password", { required: true })}
                />
                {togglePassword ? (
                  <FaEyeSlash
                    size={20}
                    className="absolute top-[15px] cursor-pointer right-3"
                    onClick={() => settogglePassword(!togglePassword)}
                  />
                ) : (
                  <FaEye
                    size={20}
                    className="absolute top-[15px] cursor-pointer right-3"
                    onClick={() => settogglePassword(!togglePassword)}
                  />
                )}
              </div>
            </div>
            <input
              type="file"
              {...register("image", { required: true })}
              placeholder="Choose Photo"
              className="w-full max-w-xs file-input file-input-bordered"
            />
            <div className="my-2 form-control">
              <button className="btn btn-primary">Sign Up</button>
            </div>
            <h2 className="text-sm font-semibold">
              Already Have An Account?{" "}
              <Link to="/login" className="underline">
                Please Login
              </Link>
            </h2>
          </form>
          <button
            onClick={() => signInWithGoogle()}
            className="flex items-center justify-center gap-3 py-3 mx-5 mb-5 text-white bg-blue-500 border rounded w hover:bg-blue-600 hover:text-white"
          >
            <FaGoogle /> Connect With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
