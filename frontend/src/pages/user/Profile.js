import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  //get user data
  useEffect(() => {
    const { username, email, phone } = auth.user;
    setUsername(username);
    setEmail(email);
    setPhone(phone);
  }, [auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { username, email, phone, password }
      );
      if (data?.error) {
        alert(data?.error);
      } else {
        setAuth({ ...auth, users: data?.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        alert("profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <Layout>
      <hr className="mx-5" />
      <div className="container col-xl-10 col-xxl-8  py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-md-10 col-lg-3">
            <UserMenu />
          </div>
          <div className="col-lg-9 text-center mx-auto w-50">
            <h1 className="display-4 fw-bold lh-1 mb-3 mx-auto">
              Update Profile
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="username">Name</label>
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
                  onChange={(e) => setPhone(e.target.value)}
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Please Enter valid mobile no");
                  }}
                  required
                />
                <label htmlFor="phone">Contact No</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary rounded-pill py-3 px-5"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
