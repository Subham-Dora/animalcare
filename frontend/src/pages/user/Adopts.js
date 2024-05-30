import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Adopts = () => {
  const [adopts, setAdopts] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAdopts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/adopts`
      );
      setAdopts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAdopts();
  }, [auth?.token]);

  //delete adopt
  const handleDelete = async (aid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-adopt/${aid}`
      );
      if (data.success) {
        alert("adopt request deleted succesfully");
        getAdopts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  
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
              Adoption Request
            </h1>
            <div class="table-responsive rounded-3">
              <table class="table table-light table-striped table-hover shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Breed</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adopts?.map((a, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>

                        <td>{a?.status}</td>
                        <td>{a?.animal?.name}</td>
                        <td>{a?.animal?.category?.name}</td>
                        <td>{a?.animal?.type}</td>
                        <td>
                        <button
                          className="btn btn-danger ms-2 rounded-pill px-3 py-1"
                          onClick={() => {
                            handleDelete(a._id);
                          }}
                        >
                          <i className="bi bi-x" />
                        </button>
                        </td>
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

export default Adopts;
