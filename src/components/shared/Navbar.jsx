import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { useQuery } from "react-query";

const Navbar = () => {
  const { user, loading, logoutUser } = useAuth();
  const [isAdmin] = useAdmin();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ["single-user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/single-user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log("navbar currentUser", currentUser);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const NavOption = () => {
    return (
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-all duration-300 ${
              isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
            }`
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/all-articles"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-all duration-300 ${
              isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
            }`
          }
          onClick={closeMenu}
        >
          All Articles
        </NavLink>
        {user && (
          <>
            <NavLink
              to="/add-articles"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                }`
              }
              onClick={closeMenu}
            >
              Add Articles
            </NavLink>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                }`
              }
              onClick={closeMenu}
            >
              Subscription
            </NavLink>
            <NavLink
              to="/premium-articles"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                }`
              }
              onClick={closeMenu}
            >
              Premium Articles
            </NavLink>
            <NavLink
              to="/my-articles"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
                }`
              }
              onClick={closeMenu}
            >
              My Articles
            </NavLink>
          </>
        )}

        {user && isAdmin && (
          <NavLink
            to="/dashboard/admin-home"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
              }`
            }
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
        )}
        {user && !isAdmin && (
          <NavLink
            to="/my-profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive ? "text-blue-600 font-medium" : "hover:text-blue-500"
              }`
            }
            onClick={closeMenu}
          >
            Profile
          </NavLink>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed bg-white top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Headline Hub
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavOption />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {user && (
                  <Link
                    to="/my-profile"
                    className="relative overflow-hidden w-10 h-10 rounded-full ring-2 ring-blue-500 p-0.5 transition-all hover:ring-blue-600"
                  >
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </Link>
                )}

                {user ? (
                  <button
                    onClick={logoutUser}
                    className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-all duration-300"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="hidden md:flex items-center space-x-3">
                    <Link
                      to="login"
                      className="px-4 py-2 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="sign-up"
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="lg:hidden ml-2 p-2 rounded-md hover:bg-gray-100 transition-all"
                >
                  {isMenuOpen ? (
                    <FiX className="w-6 h-6 text-gray-700" />
                  ) : (
                    <FiMenu className="w-6 h-6 text-gray-700" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 space-y-1">
            <div className="flex flex-col space-y-2">
              <NavOption />
              {user ? (
                <button
                  onClick={logoutUser}
                  className="mt-2 w-full text-left px-3 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <div className="mt-3 flex flex-col space-y-2">
                  <Link
                    to="login"
                    className="px-3 py-2 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="sign-up"
                    className="px-3 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
