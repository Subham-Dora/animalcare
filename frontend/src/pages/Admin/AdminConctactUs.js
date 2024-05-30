import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

const AdminContactUs = () => {
  const [allcontactus, setAllcontactus] = useState([]);
  //get all contact us
  const getContactUs = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/contactus/get-contactus`
      );
      if (data.success) {
        setAllcontactus(data.contactus);
       
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in geting contact us");
    }
  };
  useEffect(() => {
    getContactUs();
  }, []);

  //delete inquiries
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/contactus/delete-contactus/${id}`
      );
      if (data.success) {
        alert("Inquiry deleted succesfully");
        getContactUs();
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
      <div className="container py-5">
        <div className="row  g-lg-5 py-5">
          <div className="col-md-10 col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 text-center mx-auto">
            <h1 className="display-4 fw-bold lh-1 mb-4 mx-auto">
              Inquiries 
            </h1>
            <div className="table-responsive rounded-3">
              <table className="table table-light table-striped table-hover shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col"> Name</th>
                    <th scope="col">Email </th>
                    <th scope="col">Subject</th>
                    <th scope="col">Message</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allcontactus?.map((cu, i) => (
                    <tr key={cu._id}>
                      <td>{i + 1}</td>
                      <td>{cu.name}</td>
                      <td>{cu.email}</td>
                      <td>{cu.subject}</td> 
                       <td>{cu.message}</td>
                       <td>
                        <button
                          className="btn btn-danger ms-2 rounded-pill px-3 py-1"
                          onClick={() => {
                            handleDelete(cu._id);
                          }}
                        >
                          <i className="bi bi-x" />
                        </button>
                        </td>
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

export default AdminContactUs;
