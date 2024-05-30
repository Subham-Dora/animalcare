import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdminAdopts = () => {
  const [status, setStatus] = useState([
    "Request Accepted",
    "Request Rejected",
    "Requested",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [adopts, setAdopts] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAdopts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-adopts`
      );
      setAdopts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAdopts();
  }, [auth?.token]);

  const handleChange = async (adoptId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/adopt-status/${adoptId}`,
        { status: value }
      );
      getAdopts();
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="container  py-5">
        <div className="row  g-lg-5 py-5">
          <div className="col-md-10 col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 text-center mx-auto">
            <h1 className="display-4 fw-bold lh-1 mb-4 mx-auto">
              Adoption Requests
            </h1>
            <div class="table-responsive rounded-3">
              <table class="table table-light table-striped table-hover shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Contact No.</th>
                    <th scope="col">Animal Name</th>
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

                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(a._id, value)}
                            defaultValue={a?.status}
                            className="w-75"
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{a?.user?.username}</td>
                        <td>{a?.user?.phone}</td>

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

export default AdminAdopts;
