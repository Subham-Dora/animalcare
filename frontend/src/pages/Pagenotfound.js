import React from "react";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => {
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
              404 Page
            </h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Pages</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  404 Page
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* 404 Start */}
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <i className="bi bi-exclamation-triangle display-1 text-primary" />
                <h1 className="display-1">404</h1>
                <h1 className="mb-4">Page Not Found</h1>
                <p className="mb-4">
                  We’re sorry, the page you have looked for does not exist in
                  our website! Maybe go to our home page or try to use a search?
                </p>
                <a className="btn btn-secondary rounded-pill py-3 px-5" href>
                  Go Back To Home
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* 404 End */}
      </div>
    </Layout>
  );
};

export default Pagenotfound;
