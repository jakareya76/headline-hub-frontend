import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h2 className="text-5xl font-bold text-white font-mono">404</h2>
      <h2 className="text-2xl my-3 font-bold text-white font-mono">
        Page Not Found
      </h2>
      <Link
        to="/"
        className="text-white bg-slate-800 px-8 py-3 rounded-md text-xl font-semibold hover:bg-slate-900"
      >
        Go Back
      </Link>
    </div>
  );
};

export default ErrorPage;
