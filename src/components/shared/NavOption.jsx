import { NavLink } from "react-router-dom";

const NavOption = () => {
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
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );
};

export default NavOption;
