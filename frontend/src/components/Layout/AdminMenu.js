import React from "react";
import { Link, NavLink } from "react-router-dom";
import Dashboard from "./../../pages/user/Dashboard";
import { useAuth } from "../../context/auth";

const AdminMenu = () => {
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
          href="/dashboard/admin"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none  text-center"
        >
          <span className="fs-4">Dashboard</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto list-group">
          <li className="nav-item">
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item list-group-item-action mb-2 rounded-pill py-2 "
            >
              Animal Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/create-animal"
              className="list-group-item list-group-item-action mb-2 rounded-pill py-2"
            >
              Animal Profiles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/animals"
              className="list-group-item list-group-item-action mb-2 rounded-pill py-2"
            >
              Manage AnimalProfiles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/adopts"
              className="list-group-item list-group-item-action mb-2 rounded-pill py-2"
            >
              Adoption Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/adrescue"
              className="list-group-item list-group-item-action mb-2 rounded-pill py-2"
            >
              Rescue Requests
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/admin/users"
              className="list-group-item list-group-item-action mb-2 rounded-pill py-2"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/inquiries"
              className="list-group-item list-group-item-action mb-5 rounded-pill py-2"
            >
              Inquiries
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

export default AdminMenu;
