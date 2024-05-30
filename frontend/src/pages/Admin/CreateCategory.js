import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        alert(`${name} is added`);
        getAllCategory();
        setName("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("something went wring in input form");
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in geting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        alert("updated succesfully");
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  //delete category
  const handleDelete = async (aid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${aid}`
      );
      if (data.success) {
        alert("deleted succesfully");
        getAllCategory();
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
      <div className="container   py-5">
        <div className="row  g-lg-5 py-5">
          <div className="col-md-10 col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 text-center mx-auto w-50">
            <h1 className="display-4 fw-bold lh-1 mb-3 mx-auto">
              Manage Categories
            </h1>
            <div>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div class="table-responsive rounded-3 mt-3">
              <table class="table table-light table-striped table-hover shadow align-middle">
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary rounded-pill px-3 py-1"
                          onClick={() => {
                            setVisible(true);
                            setUpdateName(c.name);
                            setSelected(c);
                          }}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="btn btn-danger ms-2 rounded-pill px-3 py-1"
                          onClick={() => {
                            handleDelete(c._id);
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
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
