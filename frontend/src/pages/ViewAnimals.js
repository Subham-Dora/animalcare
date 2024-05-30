import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const ViewAnimals = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [auth] = useAuth();

  //handle adoption

  const handleAdopt = async (e, animalid, id) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/animal/adopt`,
        { animalid, id }
      );
      if (data?.success) {
        alert(
          "Thank you for your interest in adopting this animal! Your request has been received and is being reviewed by our adoption team."
        );
        navigate("/dashboard/user/adopts");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
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
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //get animals
  const getAllAnimals = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/animal/get-animal`
      );
      setAnimals(data.animals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length) getAllAnimals();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterAnimal();
    //eslint-disable-next-line
  }, [checked]);

  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filter animals
  const filterAnimal = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/animal/animal-filters`,
        { checked }
      );
      setAnimals(data?.animals);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Adopt
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Adopt
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 590 }}
          >
            <p className="section-title bg-white text-center text-primary px-3">
              Be a hero, save a life
            </p>
            <h1 className="mb-5">Adopt a furry friend today!</h1>
            <div>
              <h5>Filter by Category</h5>
              {categories?.map((c) => (
                <div className="form-check form-check-inline mb-3" key={c._id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  />
                  <label className="form-check-label">{c.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="row gx-4">
            {animals?.map((a) => (
              <div
                className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp mb-3"
                data-wow-delay="0.1s"
                key={a._id}
              >
                <div className="product-item">
                  <div className="position-relative">
                    <img
                      className="img-fluid"
                      src={`${process.env.REACT_APP_API}/api/v1/animal/animal-photo/${a._id}`}
                      alt={a.name}
                      style={{ width: "100%", height: "230px" }}
                    />
                    <div className="product-overlay">
                      <a
                        className="btn btn-square btn-secondary rounded-circle m-1"
                        onClick={() => navigate(`/viewanimals/${a._id}`)}
                      >
                        <i className="bi bi-three-dots-vertical" />
                      </a>
                      <a
                        className="btn btn-square btn-secondary rounded-circle m-1"
                        onClick={(e) => {
                          auth.token
                            ? handleAdopt(e, a._id, auth?.user._id)
                            : alert(
                                "Sorry, to request for adoption, you need to be logged in. Please log in to continue.",
                                navigate("/login")
                              );
                        }}
                      >
                        <i className="bi bi-house-heart" />
                      </a>
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <a className="d-block h5" href>
                      {a.name}
                    </a>
                    <span className="text-primary mx-1">{a.category.name}</span>
                    <span>
                      <i class="bi bi-dot"></i>
                    </span>
                    <span className="text-primary mx-1">{a.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAnimals;
