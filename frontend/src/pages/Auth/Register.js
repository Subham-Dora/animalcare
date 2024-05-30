import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { username, email, phone, password, answer }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5 my-5 rounded-3 border shadow bg-primary">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3 text-secondary">
              Find Your Furry Friend
            </h1>
            <p className="col-lg-10 fs-4 text-light">
              Make a difference in a furry life today - fill out our sign-up
              form to get started
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form
              className="p-4 p-md-5 rounded-3 shadow-sm bg-light"
              onSubmit={handleSubmit}
            >
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  className="form-control"
                  id="phone"
                  placeholder="Contact No"
                  value={phone}
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                    e.target.setCustomValidity("");
                    if (e.target.validity.patternMismatch) {
                      e.target.setCustomValidity(
                        "Please enter a 10-digit phone number."
                      );
                    }
                  }}
                />
                 <label htmlFor="phone">Contact No</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="answer"
                  placeholder="Best Friend?"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
                <label htmlFor="answer">Best Friend?</label>
              </div>
              <button className="w-100 btn btn-lg btn-secondary" type="submit">
                Sign Up
              </button>
              <hr className="my-4" />
              <span>
                Already have an account? <Link to="/login">Log In</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
