import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateAnimal = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [vaccination, setVaccination] = useState(false);
  const [description, setDescription] = useState("");

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const animalData = new FormData();
      animalData.append("name", name);
      animalData.append("photo", photo);
      animalData.append("category", category);
      animalData.append("type", type);
      animalData.append("age", age);
      animalData.append("gender", gender);
      animalData.append("vaccination", vaccination);
      animalData.append("description", description);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/animal/create-animal`,
        animalData
      );
      if (data?.success) {
        alert("Animal created Successfully");
        navigate("/dashboard/admin/animals");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
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
          <div className="col-lg-9 text-center mx-auto w-55">
            <h1 className="display-4 fw-bold lh-1 mb-3 mx-auto">
              Create Animal Profile
            </h1>
            <form onSubmit={handleCreate}>
              <div className="row g-3">
                <div className="col-12">
                  <div className="form-floating">
                    <select
                    required
                      className="form-select"
                      id="animalcategory"
                      onChange={(value) => {
                        setCategory(value.target.value);
                      }}
                    >
                      <option >Select</option>
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
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="animalimage"
                          height={"200px"}
                          className="img img-responsive rounded"
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
                        required
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
                        required
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
                        required
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
                      required
                    />
                    <label htmlFor="description">Description</label>
                  </div>
                </div>

                

                <button
                  type="submit"
                  className="btn btn-primary rounded-pill py-3 px-5"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAnimal;
