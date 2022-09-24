import axios from 'axios'
import { GET_CRA, GET_ERRORS_AUTH, GET_PROFILE } from 'redux/types';

export const GetProfile = (setForm) => async (dispatch)=>{
   await axios
     .get("/api/profile")
     .then(res => {
         dispatch({
              type: GET_PROFILE,
              payload: res.data
         })
         setForm(res.data)
     })
     .catch(err => {
        dispatch({
            type: GET_ERRORS_AUTH,
            payload: err.response.data
       })
     });
}


export const GetCRA = (setForm) => async (dispatch)=>{
     await axios
       .get("/api/tables")
       .then(res => {
           dispatch({
                type: GET_CRA,
                payload: res.data
           })
           setForm(res.data)
       })
       .catch(err => {
          dispatch({
              type: GET_ERRORS_AUTH,
              payload: err.response.data
         })
       });
  }

export const AddProfile = (form, setMessage, setShow) => dispatch=>{
    axios
      .post("/api/profile", form)
      .then(res => {
          dispatch({
               type: GET_PROFILE,
               payload: res.data
          })
          setMessage("Profile updated with success")
          setShow(true)

          setTimeout(() => {
               setShow(false) 
          }, 5000);
      })
      .catch(err => {
         dispatch({
             type: GET_ERRORS_AUTH,
             payload: err.response.data
        })
      });
 }

 export const AddProfile2 = (form, setMessage, setShow) => dispatch=>{
     axios
       .post("/api/profile", form)
       .then(res => {
           dispatch({
                type: GET_PROFILE,
                payload: res.data
           })
           setMessage("Profile Create with success")
           setShow(true)
 
           setTimeout(() => {
                setShow(false) 
           }, 5000);
       })
       .catch(err => {
          dispatch({
              type: GET_ERRORS_AUTH,
              payload: err.response.data
         })
       });
  }



  export const AddCRA = (form, setMessage, setShow) => dispatch=>{
     axios
       .post("/api/tables", form)
       .then(res => {
           dispatch({
                type: GET_CRA,
                payload: res.data
           })
           setMessage("CRA Create with success")
           setShow(true)
 
           setTimeout(() => {
                setShow(false) 
           }, 5000);
       })
       .catch(err => {
          dispatch({
              type: GET_ERRORS_AUTH,
              payload: err.response.data
         })
       });
  }