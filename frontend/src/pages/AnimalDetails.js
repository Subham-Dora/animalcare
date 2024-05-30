import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const AnimalDetails = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [animal, setAnimal] = useState({});
  const [auth] = useAuth();

  //initial details
  useEffect(() => {
    if (params?.id) getAnimal();
  }, [params?.id]);

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

  //getAnimal
  const getAnimal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/animal/get-animal/${params.id}`
      );
      setAnimal(data?.animal);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container my-5">
        <div className="px-4 py-5 my-5 rounded-3 border shadow">
          <h6 className=" text-primary">Adopt</h6>
          <h1>{animal.name}</h1>

          <img
            src={`${process.env.REACT_APP_API}/api/v1/animal/animal-photo/${animal._id}`}
            className="card-img shadow-sm my-4"
            alt={animal.name}
          />

          <div className="row justify-content-center">
            <div className="col-md-6">
              <h6>Category</h6>
            </div>
            <div className="col-md-6">
              <h6 className="text-primary">{animal?.category?.name}</h6>
            </div>
            <hr className="px-1" />
            <div className="col-md-6">
              <h6>Breed</h6>
            </div>
            <div className="col-md-6">
              <h6 className="text-primary">{animal.type}</h6>
            </div>
            <hr className="px-1" />

            <div className="col-md-6">
              <h6>Gender</h6>
            </div>
            <div className="col-md-6">
              <h6 className="text-primary">{animal.gender}</h6>
            </div>
            <hr className="px-1" />
            <div className="col-md-6">
              <h6>Age</h6>
            </div>
            <div className="col-md-6">
              <h6 className="text-primary">{animal.age}</h6>
            </div>
            <hr className="px-1" />
            <div className="col-md-6">
              <h6>Vaccinated</h6>
            </div>
            <div className="col-md-6">
              <h6 className="text-primary">
                {animal.vaccination ? "Yes" : "No"}
              </h6>
            </div>

            <hr className="px-1" />
            <div className="col-md-12">
              <h6>{animal.description}</h6>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center my-4">
                <Link to="/viewanimals">
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill py-3 px-3"
                  >
                    <i class="bi bi-arrow-left"></i>
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill py-3 px-5"
                  onClick={(e) => {
                    auth.token
                      ? handleAdopt(e, animal._id, auth?.user._id)
                      : alert(
                          "Sorry, to request for adoption, you need to be logged in. Please log in to continue.",
                          navigate("/login")
                        );
                  }}
                >
                  Adopt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnimalDetails;
