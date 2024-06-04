import { NavLink, Outlet } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#D1A054]">
        <h2 className="my-5 font-mono text-3xl font-semibold text-center">
          Headline Hub
        </h2>
        <ul className="p-4 space-y-3 menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard">
                  <FaHome /> User Home
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
