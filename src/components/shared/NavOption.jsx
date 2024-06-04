import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const NavOption = () => {
  const { user, loading, logout } = useAuth();
  const [isAdmin] = useAdmin();

  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-articles">All Articles</NavLink>
      </li>
      <li>
        <NavLink to="/add-articles">Add Articles</NavLink>
      </li>
      <li>
        <NavLink to="/subscription">Subscription</NavLink>
      </li>
      <li>
        <NavLink to="/premium-articles">Premium Articles</NavLink>
      </li>
      <li>
        <NavLink to="/my-articles">My Articles</NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink to="/dashboard/admin-home">Dashboard</NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink to="/dashboard/user-home">Dashboard</NavLink>
        </li>
      )}
    </>
  );
};

export default NavOption;
