import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const Animals = () => {
  const [animals, setAnimals] = useState([]);

  const getAllAnimals = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/animal/get-animal`
      );
      setAnimals(data.animals);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllAnimals();
  }, []);

  return (
    <Layout>
      <hr className="mx-5" />
      <div className="container   py-5">
        <div className="row  g-lg-5 py-5">
          <div className="col-md-10  col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 text-center mx-auto">
            <h1 className="display-4 fw-bold lh-1 mb-4 mx-auto">
              Animal Profiles
            </h1>
            <div className="row gx-4">
              {animals?.map((a) => (
                <div
                  className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp mb-3"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item">
                    <div className="position-relative">
                      <img
                        className="img-fluid"
                        src={`${process.env.REACT_APP_API}/api/v1/animal/animal-photo/${a._id}`}
                        alt={a.name}
                        style={{ width: "100%", height: "170px" }}
                      />
                      <div className="product-overlay">
                        <Link
                          key={a._id}
                          to={`/dashboard/admin/animal/${a._id}`}
                        >
                          <a className="btn btn-square btn-secondary rounded-circle m-1">
                            <i className="bi bi-three-dots-vertical" />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5" href>
                        {a.name}
                      </a>
                      <span className="text-primary mx-1">
                        {a.category.name}
                      </span>
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
      </div>
    </Layout>
  );
};

export default Animals;
