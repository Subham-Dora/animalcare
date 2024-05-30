import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <hr className="mx-5" />
      <div className="container   py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-md-10 mx-auto col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">
              Welcome back, {auth?.user?.username}!
            </h1>
            <p className="col-lg-10 fs-4">
              You have elevated privileges and can manage animal listings,
              applications, and user accounts
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
