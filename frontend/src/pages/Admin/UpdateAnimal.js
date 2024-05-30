import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateAnimal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  //get single animal
  const getSingleAnimal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/animal/get-animal/${params.id}`
      );
      setName(data.animal.name);
      setId(data.animal._id);
      setCategory(data.animal.category._id);
      setPhoto(data.animal.photo);
      setType(data.animal.type);
      setAge(data.animal.age);
      setGender(data.animal.gender);
      setVaccination(data.animal.vaccination);
      setDescription(data.animal.description);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleAnimal();
    //eslint-disable-next-line
  }, []);
  const onGenderChange = (e) => {
    setGender(e.target.value);
  };

  const checkVaccinated = () => {
    setVaccination(!vaccination);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const animalData = new FormData();
      animalData.append("name", name);
      photo && animalData.append("photo", photo);
      animalData.append("category", category);
      animalData.append("type", type);
      animalData.append("age", age);
      animalData.append("gender", gender);
      animalData.append("vaccination", vaccination);
      animalData.append("description", description);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/animal/update-animal/${id}`,
        animalData
      );
      if (data?.success) {
        alert("Animal updated Successfully");
        navigate("/dashboard/admin/animals");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  //delete a animal
  const handleDelete = async () => {
    try {
      if (window.confirm("Deleting animal..")) {
        await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/animal/animal-delete/${id}`
        );
        alert("Animal Deleted Successfully");
        navigate("/dashboard/admin/animals");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  return (
    <Layout>
      <hr className="mx-5" />
      <div className="container col-xl-10 col-xxl-8  py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-md-10 col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 text-center mx-auto w-55">
            <h1 className="display-4 fw-bold lh-1 mb-3 mx-auto">
              Update Animal Profile
            </h1>
            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-12">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="animalcategory"
                      onChange={(value) => {
                        setCategory(value.target.value);
                      }}
                      value={category}
                    >
                      <option selected>Select</option>
                      {categories?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="animalcategory">Animal Category</label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3 text-center">
                    <label className="btn btn-lg btn-outline-primary col-md-12">
                      {photo ? photo.name : "Upload Animal Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="text-center">
                    {photo ? (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="animalimage"
                          height={"200px"}
                          className="img img-responsive rounded"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/animal/animal-photo/${id}`}
                          alt="animalimage"
                          height={"200px"}
                          className="img img-responsive rounded-3"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Animal Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Animal Name</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="breed"
                      placeholder="Animal Breed"
                      required
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="breed">Animal Breed</label>
                  </div>
                </div>

                <div className="col-6 pt-3">
                  <div>
                    Gender :{" "}
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        checked={gender === "male"}
                        onChange={onGenderChange}
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        checked={gender === "female"}
                        onChange={onGenderChange}
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                        checked={gender === "other"}
                        onChange={onGenderChange}
                      />
                      <label className="form-check-label" htmlFor="other">
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      placeholder="Animal Age"
                      min="1"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <label htmlFor="age">Animal Age</label>
                  </div>
                </div>

                <div className="col-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="vaccination"
                      checked={vaccination}
                      onChange={checkVaccinated}
                    />
                    <label
                      className="form-check-label text-end"
                      htmlFor="vaccination"
                    >
                      Vaccinated
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Description"
                      id="description"
                      style={{ height: 100 }}
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                  </div>
                </div>

                
                <div className="text-start">
                  <button className="btn btn-primary btn-lg rounded-pill m-2 px-5 py-3">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg rounded-pill m-2 px-5 py-3"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateAnimal;
