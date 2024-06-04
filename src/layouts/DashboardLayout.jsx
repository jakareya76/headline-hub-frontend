import { NavLink, Outlet } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-64 min-h-screen text-white bg-zinc-800">
        <h2 className="my-5 font-mono text-2xl font-semibold text-center">
          Headline Hub
        </h2>
        <ul className="p-4 space-y-3 menu">
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/admin-home">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users">
                  <FaHome /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-articles">
                  <FaHome />
                  Manage Articles
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-publisher">
                  <FaHome /> Add Publisher
                </NavLink>
              </li>
            </>
          )}
          <div className="divider divider-success"></div>

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
