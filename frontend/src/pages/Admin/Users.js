import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

const Users = () => {
  const [allusers, setAllUsers] = useState([]);
  //get all category
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/getall-users`
      );
      if (data.success) {
        setAllUsers(data.users);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in geting category");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout>
      <hr className="mx-5" />
      <div className="container py-5">
        <div className="row  g-lg-5 py-5">
          <div className="col-md-10 col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 text-center mx-auto">
            <h1 className="display-4 fw-bold lh-1 mb-4 mx-auto">All Users</h1>
            <div class="table-responsive rounded-3">
              <table class="table table-light table-striped table-hover shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Contact No.</th>
                  </tr>
                </thead>
                <tbody>
                  {allusers?.map((au, i) => (
                    <tr key={au._id}>
                      <td>{i + 1}</td>

                      <td>{au.username}</td>
                      <td>{au.email}</td>
                      <td>{au.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
