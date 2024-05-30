import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Select } from "antd";
import Spinner from "../components/Spinner";

const { Option } = Select;


const Rescue = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const [animal, setAnimal] = useState("");
  const [address, setAddress] = useState("");
  const [information, setInformation] = useState("");
  const [condition, setCondition] = useState("");

  const [auth] = useAuth();

  const user = auth?.user?._id;
  const handleRescueReq = async (e) => {
    e.preventDefault();
    try {
      const rescueData = new FormData();
      rescueData.append("animal", animal);
      rescueData.append("photo", photo);
      rescueData.append("condition", condition);
      rescueData.append("address", address);
      rescueData.append("information", information);
      rescueData.append("user", user);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/rescue/send-rescue`,
        rescueData,
        user
      );
      if (data?.success) {
        alert("Rescue request sent successfully");
        navigate("/dashboard/user/userrescue");
      } else {
        alert(data?.message);
      }
    } catch (error) {}
  };

  const[ok,setOk]=useState(false)
   

    useEffect(()=>{
        const authCheck=async()=>{
            const res  = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token]);

  return ok ?  (
    <Layout>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Rescue
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Rescue
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Product Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 500 }}
          >
            <p className="section-title bg-white text-center text-primary px-3">
              Every life counts
            </p>
            <h1 className="mb-5">Rescue an animal in need!</h1>
          </div>
          <div className="row mx-5 px-5">
            <div className="col-md-12">
              <form onSubmit={handleRescueReq}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        value={animal}
                        placeholder="Animal e.g. Dog"
                        className="form-control "
                        onChange={(e) => setAnimal(e.target.value)}
                        id="animal"
                        required
                      />
                      <label htmlFor="animal">Animal e.g. Dog</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="animalcondition"
                        
                        onChange={(value) => {
                          setCondition(value.target.value);
                        }}
                        
                      >
                        <option value="">Select</option>
                        <option value="Unwell">Unwell</option>
                        <option value="Injured">Injured</option>
                        <option value="Abandoned">Abandoned</option>
                        <option value="Aggressive">Aggressive</option>
                        <option value="Accident">Accident</option>
                        <option value="Trapped">Trapped</option>
                        <option value="Other">Other</option>
                      </select>
                      <label htmlFor="animalcondition">Animal Condition</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        type="text"
                        value={address}
                        placeholder="Address"
                        className="form-control"
                        onChange={(e) => setAddress(e.target.value)}
                        id="address"
                        style={{ height: 70 }}
                        defaultValue={""}
                        required
                      />
                      <label htmlFor="address">Address</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Other Information"
                        id="info"
                        style={{ height: 100 }}
                        defaultValue={""}
                        type="text"
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}
                      />
                      <label htmlFor="info">Other Information</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3 text-center">
                      <label className="btn btn-lg btn-outline-primary col-md-6">
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
                    <div className=" text-center">
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
                  <div className="col-12">
                    <button
                      className="btn btn-secondary rounded-pill py-3 px-5"
                      type="submit"
                    >
                      Request Rescue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Product End */}
    </Layout>
  ): <Spinner/>
};

export default Rescue;
