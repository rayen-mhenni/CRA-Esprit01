import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetProfile, AddProfile2 } from '../redux/actions/profile'
import Classnames from 'classnames';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Profile() {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const profile = useSelector(state => state.profile.profile)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(AddProfile2(form, setMessage, setShow))
  }
  useEffect(async () => {
    await dispatch(GetProfile(setForm))
  }, [])
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('/TR_Resumes_Feature.png')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-40 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">

                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">


                      </div>
                      <div className="mr-4 p-3 text-center">

                      </div>
                      <div className="lg:mr-4 p-3 text-center">

                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                      <h6 className="text-blueGray-700 text-xl font-bold">My CV IS HERE</h6>
                      <button
                        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Create YOUR CV
                      </button>
                    </div>
                  </div>
                  <div className={Classnames("rounded-t bg-green-500 mb-0 px-6 py-6 mt-3", { "hidden": !show })} style={{ backgroundColor: "green", opacity: "0.5" }}>
                    <div className="text-center flex justify-between">
                      <h6 className="text-white text-xl font-bold">{message}</h6>
                    </div>
                  </div>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Information general
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                          Nom et Prenom
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={form && form.user && form.user.email ? form.user.email : ""}
                          onChange={onChange}
                          className="border-0 px-3 py-3 disabled placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                        />
                      </div>




                

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                          Titre du profil

                        </label>
                        <input
                          type="text"
                          name="email"
                          value={form && form.user && form.user.email ? form.user.email : ""}
                          onChange={onChange}
                          className="border-0 px-3 py-3 disabled placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                         Numéro de téléphone
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={form && form.user && form.user.email ? form.user.email : ""}
                          onChange={onChange}
                          className="border-0 px-3 py-3 disabled placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                        />
                      </div>


                      <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form && form.city ? form.city : ""}
                    onChange={onChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                   {
                    errors.city && (<span style={{ color: "red"}}>{errors.city}</span>)
                  }
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={form && form.country ? form.country : ""}
                    onChange={onChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                   {
                    errors.country && (<span style={{ color: "red"}}>{errors.country}</span>)
                  }
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalcode"
                    value={form && form.postalcode ? form.postalcode : ""}
                    onChange={onChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                   {
                    errors.postalcode && (<span style={{ color: "red"}}>{errors.postalcode}</span>)
                  }
                </div>
              </div>

                    </div>

                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Contact Information
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={form && form.email ? form.email : ""}
                          onChange={onChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        {
                          errors.address && (<span style={{ color: "red" }}>{errors.address}</span>)
                        }
                      </div>
                    </div>
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={form && form.address ? form.address : ""}
                          onChange={onChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        {
                          errors.address && (<span style={{ color: "red" }}>{errors.address}</span>)
                        }
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={form && form.city ? form.city : ""}
                          onChange={onChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        {
                          errors.city && (<span style={{ color: "red" }}>{errors.city}</span>)
                        }
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={form && form.country ? form.country : ""}
                          onChange={onChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        {
                          errors.country && (<span style={{ color: "red" }}>{errors.country}</span>)
                        }
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalcode"
                          value={form && form.postalcode ? form.postalcode : ""}
                          onChange={onChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        {
                          errors.postalcode && (<span style={{ color: "red" }}>{errors.postalcode}</span>)
                        }
                      </div>
                    </div>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    About Me
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          About me
                        </label>
                        <textarea
                          type="text"
                          onChange={onChange}
                          name="about"
                          value={form && form.about ? form.about : ""}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>




                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
