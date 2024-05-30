import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleContactUs = async (e) => {
    e.preventDefault();
    try {
      const contactUsData = new FormData();
      contactUsData.append("name", name);
      contactUsData.append("email", email);
      contactUsData.append("subject", subject);
      contactUsData.append("message", message);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/contactus/send-contactus`,
        contactUsData
      );
      if (data?.success) {
        alert("Contact Us form submitted successfully");
        navigate("/");
      } else {
        alert(data?.message);
      }
    } catch (error) {}
  };
  return (
    <Layout>
      <>
        <div>
          {/* Page Header Start */}
          <div
            className="container-fluid page-header py-5 mb-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            <div className="container text-center py-5">
              <h1 className="display-3 text-white mb-4 animated slideInDown">
                Contact
              </h1>
              <nav aria-label="breadcrumb animated slideInDown">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* Page Header End */}
          {/* Contact Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div
                className="text-center mx-auto wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: 500 }}
              >
                <p className="section-title bg-white text-center text-primary px-3">
                  Contact Us
                </p>
                <h1 className="mb-5">
                  If You Have Any Query, Please Contact Us
                </h1>
              </div>
              <div className="row g-5">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                  <h3 className="mb-4">We're always happy to hear from you!</h3>
                  <p className="mb-4">
                    To contact us, you can use the form on this page or send us
                    an email at animalcare@mail.com. We'll do our best to
                    respond to your inquiry within 24-48 hours.
                  </p>
                  <form onSubmit={handleContactUs}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            style={{ height: 250 }}
                            defaultValue={""}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          />
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-secondary rounded-pill py-3 px-5"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                  <h3 className="mb-4">Contact Details</h3>
                  <div className="d-flex border-bottom pb-3 mb-3">
                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                      <i className="fa fa-map-marker-alt text-body" />
                    </div>
                    <div className="ms-3">
                      <h6>Our Office</h6>
                      <span>123 Street, Surat, India</span>
                    </div>
                  </div>
                  <div className="d-flex border-bottom pb-3 mb-3">
                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                      <i className="fa fa-phone-alt text-body" />
                    </div>
                    <div className="ms-3">
                      <h6>Call Us</h6>
                      <span>+91 99887 76655</span>
                    </div>
                  </div>
                  <div className="d-flex border-bottom-0 pb-3 mb-3">
                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                      <i className="fa fa-envelope text-body" />
                    </div>
                    <div className="ms-3">
                      <h6>Mail Us</h6>
                      <span>animalcare@mail.com</span>
                    </div>
                  </div>
                  <iframe
                    className="w-100 rounded"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.33644352792!2d72.73987854171638!3d21.159440567575498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1681980643072!5m2!1sen!2sin"
                    style={{ minHeight: 300, border: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Contact End */}
        </div>
      </>
    </Layout>
  );
};

export default Contact;
