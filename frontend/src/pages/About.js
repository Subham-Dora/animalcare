import React from "react";
import Layout from "../components/Layout/Layout";
import {} from "react-router-dom";
import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const About = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  return (
    <Layout>
      <div>
        {/* Page Header Start */}
        <div
          className="container-fluid page-header py-5 mb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container text-center py-5">
            <h1 className="display-3 text-white mb-4 animated slideInDown">
              About Us
            </h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  About
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* About Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5 align-items-end">
              <div className="col-lg-6">
                <div className="row g-2">
                  <div
                    className="col-6 position-relative wow fadeIn"
                    data-wow-delay="0.7s"
                  >
                    <div className="about-experience bg-secondary rounded">
                      <h1 className="display-1 mb-0">5</h1>
                      <small className="fs-5 fw-bold">Years Experience</small>
                    </div>
                  </div>
                  <div className="col-6 wow fadeIn" data-wow-delay="0.1s">
                    <img
                      className="img-fluid rounded"
                      src="img/service-1.jpg"
                    />
                  </div>
                  <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                    <img
                      className="img-fluid rounded"
                      src="img/service-2.jpg"
                    />
                  </div>
                  <div className="col-6 wow fadeIn" data-wow-delay="0.5s">
                    <img
                      className="img-fluid rounded"
                      src="img/service-3.jpg"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <p className="section-title bg-white text-start text-primary pe-3">
                  About Us
                </p>
                <h1 className="mb-4">
                  Know About Our AnimalCare &amp; Our Team
                </h1>
                <p className="mb-4">
                  We are a dedicated team of animal lovers who are committed to
                  helping animals in need find their forever homes. Our mission
                  is to provide a safe haven for animals that have been
                  abandoned, neglected, or abused.
                </p>
                <div className="row g-5 pt-2 mb-5">
                  <div className="col-sm-6">
                    <img className="img-fluid mb-4" src="img/service.png" alt />
                    <h5 className="mb-3">Dedicated Services</h5>
                    <span>
                      Our team is made up of volunteers and staff who are
                      passionate
                    </span>
                  </div>
                  <div className="col-sm-6">
                    <img className="img-fluid mb-4" src="img/product.png" alt />
                    <h5 className="mb-3">Care</h5>
                    <span>
                      providing medical care, food, forever home matching,
                      education, and much more
                    </span>
                  </div>
                </div>
                <a className="btn btn-secondary rounded-pill py-3 px-5" href>
                  Explore More
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* About End */}
        {/* Banner Start */}
        <div
          className="container-fluid banner my-5 py-5"
          data-parallax="scroll"
          data-image-src="img/banner.jpg"
        >
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
                <div className="row g-4 align-items-center">
                  <div className="col-sm-4">
                    <img
                      className="img-fluid rounded"
                      src="img/banner-1.jpg"
                      alt
                    />
                  </div>
                  <div className="col-sm-8">
                    <h2 className="text-white mb-3">
                      Adopted animals often make the best pets
                    </h2>
                    <p className="text-white mb-4">
                      as they are grateful for a second chance and show endless
                      amounts of love and affection.
                    </p>
                    <Link to="/viewanimals">
                      <a
                        className="btn btn-secondary rounded-pill py-2 px-4"
                        href
                      >
                        Adopt
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <div className="row g-4 align-items-center">
                  <div className="col-sm-4">
                    <img
                      className="img-fluid rounded"
                      src="img/banner-2.jpg"
                      alt
                    />
                  </div>
                  <div className="col-sm-8">
                    <h2 className="text-white mb-3">
                      By rescuing animals from abusive or neglectful situations
                    </h2>
                    <p className="text-white mb-4">
                      we provide them with a second chance at a happy life.
                    </p>
                    <Link
                      to={auth.token ? "/rescue" : "/login"}
                      onClick={() => {
                        !auth.token
                          ? alert("Please log in to access Rescue Request")
                          : navigate();
                      }}
                    >
                      <a
                        className="btn btn-secondary rounded-pill py-2 px-4"
                        href
                      >
                        Rescue
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner End */}
      </div>
    </Layout>
  );
};

export default About;
