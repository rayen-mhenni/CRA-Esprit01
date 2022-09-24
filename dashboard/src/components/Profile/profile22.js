import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PROfile_CREATE_RESET } from "../../Redux/Constants/ProfileConstants";
import { createProfile } from "../../Redux/Actions/ProfileActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const Profile22 = () => {
  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [email, setemail] = useState("");
  const [universty, setuniversity] = useState("");
  const [country, setcountry] = useState("");
  const [postalcode, setpostal] = useState("");
  // const [about, setabout] = useState("");
 

  const dispatch = useDispatch();

  const profileCreate = useSelector((state) => state.profileCreate);
  // const { loading, error, profile } = profileCreate;
const profile = profileCreate;
  useEffect(() => {
    if (profile) {
      toast.success("Document Added", ToastObjects);
      dispatch({ type: PROfile_CREATE_RESET });
      setAdress("");
      setCity("");
      setemail("");
      setuniversity("");
      setcountry("");
      setpostal("");
      // setabout("");

    }
  }, [profile, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProfile(address, city, email, universty, country));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Affiches tou les documents
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />} */}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      profile title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={address}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Sujet
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      type
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={universty}
                      onChange={(e) => setuniversity(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={country}
                      required
                      onChange={(e) => setcountry(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile22;
