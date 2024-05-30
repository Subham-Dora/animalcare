import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const UserMenu = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("You have been successfully logged out");
  };
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark rounded-3 shadow">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">My Account</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto list-group">
          <li className="nav-item">
            <NavLink
              to="/dashboard/user/profile"
              className="list-group-item list-group-item-action mb-2 rounded-pill py-2 "
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/adopts"
              className="list-group-item list-group-item-action mb-2 rounded-pill py-2"
            >
              Adopt
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/userrescue"
              className="list-group-item list-group-item-action mb-5 rounded-pill py-2"
            >
              Rescue
            </NavLink>
          </li>
        </ul>
        <hr />

        <button className="btn btn-secondary rounded-pill py-3 px-5">
          <Link onClick={handleLogout} to="/login" className="text-dark">
            Logout
          </Link>
        </button>
      </div>
    </>
  );
};

export default UserMenu;
