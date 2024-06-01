import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import NavOption from "./NavOption";

import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="container bg-transparent mx-auto z-50 ">
      <div className="navbar text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              className="menu menu-sm gap-4 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavOption />
            </ul>
          </div>
          <Link to="/">
            <button className="shadows-into-light text-3xl">
              Headline Hub
            </button>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-5 px-1">
            <NavOption />
          </ul>
        </div>
        <div className="navbar-end">
          {/* <img src="" alt="" /> */}
          <FaUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
