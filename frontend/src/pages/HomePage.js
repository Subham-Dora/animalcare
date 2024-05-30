import React from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Layout/Footer";
import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  return (
    <Layout>
      <>
        <div>
          {/* Carousel Start */}
          <div className="container-fluid px-0 mb-5">
            <div
              id="header-carousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
                  <div className="carousel-caption">
                    <div className="container">
                      <div className="row justify-content-start">
                        <div className="col-lg-8 text-start">
                          <p className="fs-4 text-white">
                            Be a hero, save a life
                          </p>
                          <h1 className="display-1 text-white mb-5 animated slideInRight">
                            adopt a furry friend today!
                          </h1>
                          <Link to="/viewanimals">
                            <a className="btn btn-secondary rounded-pill py-3 px-5 animated slideInRight">
                              Adopt
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
                  <div className="carousel-caption">
                    <div className="container">
                      <div className="row justify-content-end">
                        <div className="col-lg-8 text-end">
                          <p className="fs-4 text-white">Every life counts</p>
                          <h1 className="display-1 text-white mb-5 animated slideInRight">
                            rescue an animal in need!
                          </h1>
                          <Link
                            to={auth.token ? "/rescue" : "/login"}
                            onClick={() => {
                              !auth.token
                                ? alert(
                                    "Please log in to access Rescue Request"
                                  )
                                : navigate();
                            }}
                          >
                            <a className="btn btn-secondary rounded-pill py-3 px-5 animated slideInLeft">
                              Rescue
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* Carousel End */}
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
                    We are a dedicated team of animal lovers who are committed
                    to helping animals in need find their forever homes. Our
                    mission is to provide a safe haven for animals that have
                    been abandoned, neglected, or abused, and to ensure that
                    they receive the love, care, and attention they deserve.
                  </p>
                  <div className="row g-5 pt-2 mb-5">
                    <div className="col-sm-6">
                      <img
                        className="img-fluid mb-4"
                        src="img/service.png"
                        alt
                      />
                      <h5 className="mb-3">Dedicated Services</h5>
                      <span>
                        Our team is made up of volunteers and staff who are
                        passionate
                      </span>
                    </div>
                    <div className="col-sm-6">
                      <img
                        className="img-fluid mb-4"
                        src="img/product.png"
                        alt
                      />
                      <h5 className="mb-3">Care</h5>
                      <span>
                        providing medical care, food, forever home matching,
                        education, and much more
                      </span>
                    </div>
                  </div>
                  <Link to="/about">
                    <a
                      className="btn btn-secondary rounded-pill py-3 px-5"
                      href
                    >
                      Explore More
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* About End */}
          {/* Features Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-5 align-items-center">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                  <p className="section-title bg-white text-start text-primary pe-3">
                    Why Us!
                  </p>
                  <h1 className="mb-4">Few Reasons Why People Choosing Us!</h1>
                  <p className="mb-4">
                    At our organization, we believe that every animal deserves a
                    chance to be happy and healthy. We work tirelessly to rescue
                    animals from shelters, abusive situations, or the streets,
                    and provide them with the medical care, food, shelter, and
                    love they need to thrive. We also work to educate the public
                    about responsible pet ownership and the importance of
                    spaying and neutering to prevent overpopulation and
                    unnecessary suffering.
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3" />
                    Passion for animals
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3" />
                    Professional interest
                  </p>
                  <p>
                    <i className="fa fa-check text-primary me-3" />
                    Advocacy
                  </p>
                  <Link to="/about">
                    <a
                      className="btn btn-secondary rounded-pill py-3 px-5 mt-3"
                      href
                    >
                      Explore More
                    </a>
                  </Link>
                </div>
                <div className="col-lg-6">
                  <div className="rounded overflow-hidden">
                    <div className="row g-0">
                      <div
                        className="col-sm-6 wow fadeIn"
                        data-wow-delay="0.1s"
                      >
                        <div className="text-center bg-primary py-5 px-4">
                          <img
                            className="img-fluid mb-4"
                            src="img/experience.png"
                            alt
                          />
                          <h1
                            className="display-6 text-white"
                            data-toggle="counter-up"
                          >
                            5
                          </h1>
                          <span className="fs-5 fw-semi-bold text-secondary">
                            Years Experience
                          </span>
                        </div>
                      </div>
                      <div
                        className="col-sm-6 wow fadeIn"
                        data-wow-delay="0.3s"
                      >
                        <div className="text-center bg-secondary py-5 px-4">
                          <img
                            className="img-fluid mb-4"
                            src="img/award.png"
                            alt
                          />
                          <h1 className="display-6" data-toggle="counter-up">
                            25
                          </h1>
                          <span className="fs-5 fw-semi-bold text-primary">
                            Award Winning
                          </span>
                        </div>
                      </div>
                      <div
                        className="col-sm-6 wow fadeIn"
                        data-wow-delay="0.5s"
                      >
                        <div className="text-center bg-secondary py-5 px-4">
                          <img
                            className="img-fluid mb-4"
                            src="img/animal.png"
                            alt
                          />
                          <h1 className="display-6" data-toggle="counter-up">
                            730
                          </h1>
                          <span className="fs-5 fw-semi-bold text-primary">
                            Animals Saved
                          </span>
                        </div>
                      </div>
                      <div
                        className="col-sm-6 wow fadeIn"
                        data-wow-delay="0.7s"
                      >
                        <div className="text-center bg-primary py-5 px-4">
                          <img
                            className="img-fluid mb-4"
                            src="img/client.png"
                            alt
                          />
                          <h1
                            className="display-6 text-white"
                            data-toggle="counter-up"
                          >
                            200
                          </h1>
                          <span className="fs-5 fw-semi-bold text-secondary">
                            Passionate volunteers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Features End */}
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
                        as they are grateful for a second chance and show
                        endless amounts of love and affection.
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
                        By rescuing animals from abusive or neglectful
                        situations
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
          {/* Service Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div
                className="text-center mx-auto pb-4 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: 500 }}
              >
                <p className="section-title bg-white text-center text-primary px-3">
                  Our Services
                </p>
                <h1 className="mb-5">
                  Services That We Offer For Entrepreneurs
                </h1>
              </div>
              <div className="row gy-5 gx-4">
                <div
                  className="col-lg-4 col-md-6 pt-5 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="service-item d-flex h-100">
                    <div className="service-img">
                      <img className="img-fluid" src="img/service-1.jpg" alt />
                    </div>
                    <div className="service-text p-5 pt-0">
                      <div className="service-icon">
                        <img
                          className="img-fluid rounded-circle"
                          src="img/service-1.jpg"
                          alt
                        />
                      </div>
                      <h5 className="mb-3">Pet Adoption Listings</h5>
                      <p className="mb-4">
                        One of the main services of AnimalCare is to provide a
                        platform for shelters and rescue organizations to list
                        the pets that are available for adoption.
                      </p>
                      <Link to="/about">
                        <a className="btn btn-square rounded-circle" href>
                          <i className="bi bi-chevron-double-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 pt-5 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="service-item d-flex h-100">
                    <div className="service-img">
                      <img className="img-fluid" src="img/service-2.jpg" alt />
                    </div>
                    <div className="service-text p-5 pt-0">
                      <div className="service-icon">
                        <img
                          className="img-fluid rounded-circle"
                          src="img/service-2.jpg"
                          alt
                        />
                      </div>
                      <h5 className="mb-3">Adoption Application Process</h5>
                      <p className="mb-4">
                        Many animal rescue and adoption websites offer an online
                        application process for potential adopters.
                      </p>
                      <Link to="/about">
                        <a className="btn btn-square rounded-circle" href>
                          <i className="bi bi-chevron-double-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 pt-5 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="service-item d-flex h-100">
                    <div className="service-img">
                      <img className="img-fluid" src="img/service-3.jpg" alt />
                    </div>
                    <div className="service-text p-5 pt-0">
                      <div className="service-icon">
                        <img
                          className="img-fluid rounded-circle"
                          src="img/service-3.jpg"
                          alt
                        />
                      </div>
                      <h5 className="mb-3">Resources for Pet Owners</h5>
                      <p className="mb-4">
                        Animal rescue and adoption websites often provide
                        resources and information for current and prospective
                        pet owners.
                      </p>
                      <Link to="/about">
                        <a className="btn btn-square rounded-circle" href>
                          <i className="bi bi-chevron-double-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Service End */}
          {/* Gallery Start */}
          <div className="container-xxl py-5 px-0">
            <div className="row g-0">
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="row g-0">
                  <div className="col-12">
                    <a
                      className="d-block"
                      href="img/gallery-5.jpg"
                      data-lightbox="gallery"
                    >
                      <img className="img-fluid" src="img/gallery-5.jpg" alt />
                    </a>
                  </div>
                  <div className="col-12">
                    <a
                      className="d-block"
                      href="img/gallery-1.jpg"
                      data-lightbox="gallery"
                    >
                      <img className="img-fluid" src="img/gallery-1.jpg" alt />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="row g-0">
                  <div className="col-12">
                    <a
                      className="d-block"
                      href="img/gallery-2.jpg"
                      data-lightbox="gallery"
                    >
                      <img className="img-fluid" src="img/gallery-2.jpg" alt />
                    </a>
                  </div>
                  <div className="col-12">
                    <a
                      className="d-block"
                      href="img/gallery-6.jpg"
                      data-lightbox="gallery"
                    >
                      <img className="img-fluid" src="img/gallery-6.jpg" alt />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="row g-0">
                  <div className="col-12">
                    <a
                      className="d-block"
                      href="img/gallery-7.jpg"
                      data-lightbox="gallery"
                    >
                      <img className="img-fluid" src="img/gallery-7.jpg" alt />
                    </a>
                  </div>
                  <div className="col-12">
                    <a
                      className="d-block"
                      href="img/gallery-3.jpg"
                      data-lightbox="gallery"
                    >
                      <img className="img-fluid" src="img/gallery-3.jpg" alt />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.7s"
              >
                <div className="row g-0">
                  <div className="col-12">
                    <a
                      className="d-block"
                      href="img/gallery-4.jpg"
                      data-lightbox="gallery"
                    >
                      <img className="img-fluid" src="img/gallery-4.jpg" alt />
                    </a>
                  </div>
                  <div className="col-12">
                    <a
                      className="d-block"
                      href="img/gallery-8.jpg"
                      data-lightbox="gallery"
                    >
                      <img className="img-fluid" src="img/gallery-8.jpg" alt />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Gallery End */}
          {/* Testimonial Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div
                className="text-center mx-auto wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: 500 }}
              >
                <p className="section-title bg-white text-center text-primary px-3">
                  Testimonial
                </p>
                <h1 className="mb-5">What People Say About Our AnimalCare</h1>
              </div>
              <div className="row g-5 align-items-center">
                <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="testimonial-img">
                    <img
                      className="img-fluid animated pulse infinite"
                      src="img/testimonial-1.jpg"
                      alt
                    />
                    <img
                      className="img-fluid animated pulse infinite"
                      src="img/testimonial-2.jpg"
                      alt
                    />
                    <img
                      className="img-fluid animated pulse infinite"
                      src="img/testimonial-3.jpg"
                      alt
                    />
                    <img
                      className="img-fluid animated pulse infinite"
                      src="img/testimonial-4.jpg"
                      alt
                    />
                  </div>
                </div>
                <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.5s">
                  <img
                    className="img-fluid mb-3 rounded-circle"
                    src="img/testimonial-1.jpg"
                    alt
                  />
                  <p className="fs-5">
                    I am very happy to adopt Olivia. I was fortunate enough to
                    find her on AnimalCare.
                  </p>
                  <h5>Komal Jain</h5>
                  <span className="text-primary">C.A.</span>
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial End */}
        </div>
      </>
    </Layout>
  );
};

export default HomePage;
