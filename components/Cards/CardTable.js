import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {GetCRA, AddCRA } from '../../redux/actions/profile'
import Classnames from 'classnames'
// components


export default function CardTable({ color }) {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const cra = useSelector(state => state.cra)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const onChange = (e)=>{
   setForm({
     ...form,
     [e.target.name]: e.target.value
   })
  }

  const onSubmit = (e)=>{
  e.preventDefault()
  dispatch(AddCRA(form, setMessage, setShow))
  }
  useEffect(async()=>{
    await dispatch(GetCRA(setForm))
  },[])
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-2">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-8 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                 Table compte rendu
              </h3>
            </div>
          </div>
        </div>
       <form onSubmit={onSubmit}>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Project
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Activite
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Date realisation
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Nombre heurs
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th>
              </tr>
            </thead>
            
            <tbody>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  
                  <span  className={"ml-4 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
               <div className="w-full lg:w-12/12 px-0">
                 <div className="relative w-full mb-3">
                 
                  <input
                    type="text"
                    name="Project"
                    value={form && form.Project ? form.Project : ""}
                    onChange={onChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                   
                  </div>
                  </div>
                   
                  </span>










                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span
                    className={
                      "ml-4 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    <div className="w-full lg:w-12/12 px-0">
                 <div className="relative w-full mb-3">
                 
                  <input
                    type="text"
                    name="Activite"
                    value={form && form.Activite ? form.Activite : ""}
                    onChange={onChange}
                   
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                   
                  </div>
                  </div>
                   
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span
                    className={
                      "ml-4 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    <div className="w-full lg:w-12/12 px-0">
                 <div className="relative w-full mb-3">
                 
                  <input
                    type="text"
                    name="DateR"
                    value={form && form.DateR ? form.DateR : ""}
                    onChange={onChange}
                   
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                   
                  </div>
                  </div>
                   
                  </span>                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                  <span
                    className={
                      "ml-4 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    <div className="w-full lg:w-12/12 px-0">
                 <div className="relative w-full mb-3">
                 
                  <input
                    type="text"
                    name="Nombreh"
                    value={form && form.Nombreh ? form.Nombreh : ""}
                    onChange={onChange}
                   
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                   
                  </div>
                  </div>
                   
                  </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                  <span
                    className={
                      "ml-4 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    <div className="w-full lg:w-12/12 px-0">
                 <div className="relative w-full mb-3">
                 
                  <input
                    type="text"
                    name="Status"
                    value={form && form.Status ? form.Status : ""}
                    onChange={onChange}
                   
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                   
                  </div>
                  </div>
                   
                  </span>
                    
                    
                  </div>
                </td>
                <td >
                <div className="w-full lg:w-12/12 px-0">
                 <div className="relative w-full mb-3">
                <button
                    type="submit"
                    name="enregistrer"
                   
                    className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >       enregistrer  </button>
                  </div>
                  </div>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
        </form>
      </div>
    </>
  );
}

// CardTable.defaultProps = {
//   color: "light",
// };

CardTable.propTypes = {
  color: PropTypes.oneOf([ "dark"]),
};
