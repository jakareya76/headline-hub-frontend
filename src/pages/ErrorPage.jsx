import { Link } from "react-router-dom";
import pageNotFoundImage from "../assets/page_not_found.svg";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <img src={pageNotFoundImage} alt="404" className="w-[320px]" />
      <h2 className="my-8 font-mono text-4xl font-bold">Page Not Found</h2>
      <Link
        to="/"
        className="px-8 py-3 text-xl font-semibold text-white rounded-md bg-slate-800 hover:bg-slate-900"
      >
        Go Back
      </Link>
    </div>
  );
};

export default ErrorPage;
