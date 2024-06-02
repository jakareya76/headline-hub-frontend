import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import NavOption from "./NavOption";

import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="container z-[9999] mx-auto bg-transparent">
      <div className="navbar">
        <div className="navbar-start">
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
          <Link to="/">
            <button className="text-3xl shadows-into-light">
              Headline Hub
            </button>
          </Link>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="gap-5 px-1 menu menu-horizontal">
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
