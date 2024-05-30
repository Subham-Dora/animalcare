import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container-fluid bg-secondary text-body copyright py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            ©{" "}
            <a className="fw-semi-bold" href="#">
              AnimalCare
            </a>
            , All Right Reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            Developed By{" "}
            <a className="fw-semi-bold" href="">
              Subham & Neel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
