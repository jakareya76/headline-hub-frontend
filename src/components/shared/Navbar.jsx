import { Link } from "react-router-dom";
import NavOption from "./NavOption";

import { FaUser } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, loading, logoutUser } = useAuth();

  return (
    <nav className="container z-[9999] mx-auto bg-transparent">
      <div className="navbar">
        <div className="flex-1 navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost z-[9999] lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu z-[9999] menu-sm gap-4 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavOption />
            </ul>
          </div>
          <Link to="/" className="block lg:hidden">
            <button className="text-xl lg:text-3xl shadows-into-light">
              Headline Hub
            </button>
          </Link>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="gap-5 px-1 menu menu-horizontal">
            <Link to="/" className="hidden lg:block">
              <button className="text-xl lg:text-3xl shadows-into-light">
                Headline Hub
              </button>
            </Link>
            <NavOption />
          </ul>
        </div>
        <div className="gap-5 mr-5 navbar-end">
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            <>
              {user && (
                <div className="p-1 rounded-full bg-slate-200">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-[40px] rounded-full h-[40px] object-cover"
                  />
                </div>
              )}

              {user ? (
                <button
                  className="px-8 btn btn-primary"
                  onClick={() => logoutUser()}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="login"
                    className="px-6 text-white bg-blue-500 btn hover:bg-blue-600 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="sign-up"
                    className="px-5 text-white bg-green-500 btn hover:bg-green-600 hover:text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
