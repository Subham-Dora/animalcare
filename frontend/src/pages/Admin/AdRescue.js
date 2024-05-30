import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdRescue = () => {
  const [rescue, setRescue] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.token) getRescue();
  }, [auth?.token]);

  const getRescue = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/rescue/all-rescue`
      );
      setRescue(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [status, setStatus] = useState([
    "Coming ",
    "Not Rescued",
    "Rescued Successfully",
    "Reported",
  ]);

  const handleChange = async (rescueId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/rescue/rescue-status/${rescueId}`,
        { status: value }
      );
      getRescue();
    } catch (error) {
      console.log(error);
    }
  };

   //delete rescue request
   const handleDelete = async (rid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/rescue/delete-rescue/${rid}`
      );
      if (data.success) {
        alert("deleted succesfully");
        getRescue();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const [changeStatus, setChangeStatus] = useState("");
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
              Rescue Requests
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
                    <th scope="col">Information</th>
                    <th scope="col">User Info</th>
                    <th scope="col">Action</th>
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
                              style={{ width: 90, height: 100 }}
                              className="rounded-3 mx-auto d-block shadow-sm"
                            />
                          </div>
                        </td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(r._id, value)}
                            defaultValue={r?.status}
                            size={"small"}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{r?.animal}</td>
                        <td>{r?.condition}</td>
                        <td>{r?.address}</td>
                        <td>{r?.information}</td>
                        <td>
                          {r?.user.username}
                          <br />
                          {r?.user.phone}
                        </td>
                        <td>
                         
                          <button
                          className="btn btn-danger  rounded-pill px-2 py-1"
                          onClick={() => {
                            handleDelete(r._id);
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

export default AdRescue;
