import React from "react";
import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

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
      {/* Topbar Start */}
      <div className="container-fluid bg-dark px-0">
        <div className="row g-0 d-none d-lg-flex">
          <div className="col-lg-6 ps-5 text-start">
            <div className="h-100 d-inline-flex align-items-center text-light">
              <span>Follow Us:</span>
              <a
                className="btn btn-link text-light"
                href="https://www.facebook.com/"
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-link text-light"
                href="https://twitter.com/"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-link text-light"
                href="https://in.linkedin.com/"
                target="_blank"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                className="btn btn-link text-light"
                href="https://www.instagram.com/"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-end">
            <div className="h-100 bg-secondary d-inline-flex align-items-center text-dark py-2 px-4">
              <span className="me-2 fw-semi-bold">
                <i className="fa fa-phone-alt me-2" />
                Call Us:
              </span>
              <span>+91 99887 76655</span>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <h1 className="m-0">AnimalCare</h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-0"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link ">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/viewanimals" className="nav-item nav-link">
              Adopt
            </Link>
            <Link
              to={auth.token ? "/rescue" : "/login"}
              onClick={() => {
                !auth.token
                  ? alert("Please log in to access Rescue Request")
                  : navigate();
              }}
              className="nav-item nav-link"
            >
              Rescue
            </Link>
            {!auth.user ? (
              <div className="nav-item dropdown">
                <a
                  href="true"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  User
                </a>
                <div className="dropdown-menu bg-light m-0">
                  <Link to="/register" className="dropdown-item">
                    Sign Up
                  </Link>
                  <Link to="/login" className="dropdown-item">
                    Log In
                  </Link>
                </div>
              </div>
            ) : (
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {auth?.user?.username}
                </a>
                <div className="dropdown-menu bg-light m-0">
                  <Link
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </Link>
                  <Link
                    onClick={handleLogout}
                    to="/login"
                    className="dropdown-item"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>
        </div>
      </nav>
      {/* Navbar End */}
      <Outlet />
    </>
  );
};

export default Header;
