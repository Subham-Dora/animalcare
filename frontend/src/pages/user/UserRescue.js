import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Rescue from "./../Rescue";

const UserRescue = () => {
  const [rescue, setRescue] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAdopts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/rescue/get-rescue`
      );
      setRescue(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAdopts();
  }, [auth?.token]);

  
  return (
    <Layout>
      <hr className="mx-5" />
      <div className="container col-xl-10 col-xxl-8  py-5">
        <div className="row  g-lg-5 py-5">
          <div className="col-md-10 col-lg-3">
            <UserMenu />
          </div>
          <div className="col-lg-9 text-center mx-auto">
            <h1 className="display-4 fw-bold lh-1 mb-4 mx-auto">
              Rescue Request
            </h1>
            <div class="table-responsive rounded-3">
              <table class="table table-light table-striped table-hover align-middle shadow">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Status</th>
                    <th scope="col">Animal</th>
                    <th scope="col">Condition</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {rescue?.map((r, i) => {
                    return (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/rescue/rescue-photo/${r._id}`}
                              alt={r.name}
                              style={{ width: 300, height: 200 }}
                              className="rounded-3 mx-auto d-block shadow-sm"
                            />
                          </div>
                        </td>
                        <td>{r?.status}</td>
                        <td>{r?.animal}</td>
                        <td>{r?.condition}</td>
                        <td>{r?.address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserRescue;
