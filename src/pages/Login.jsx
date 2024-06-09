import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import authImage from "../assets/auth.svg";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [togglePassword, settogglePassword] = useState(true);
  const navigate = useNavigate();

  const { loginUser, user, signInWithGoogle } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      toast.success("Login Successfull");

      navigate("/");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        toast.error("Invalid Credential ");
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
        <div className="w-full max-w-sm overflow-hidden shadow-2xl card shrink-0 bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
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
                  required
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

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="my-2 form-control">
              <button className="btn btn-primary">Login</button>
            </div>
            <h2 className="text-sm font-semibold">
              New Here?{" "}
              <Link to="/sign-up" className="underline">
                Create An Account
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

export default Login;
