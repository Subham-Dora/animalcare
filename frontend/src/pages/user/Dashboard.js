import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <hr className="mx-5" />
      <div className="container col-xl-10 col-xxl-8  py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-md-10 mx-auto col-lg-3">
            <UserMenu />
          </div>
          <div className="col-lg-9 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">
              Hello {auth?.user?.username}!
            </h1>
            <p className="col-lg-10 fs-4">
              You can update your profile and view pending requests here
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
