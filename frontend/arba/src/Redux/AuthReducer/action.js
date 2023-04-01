import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
  } from "./action.type";

  import axios from "axios";

  import { useNavigate } from "react-router-dom";


  import {saveLocalData} from "../../Utils/localStorage"

  export const reset =(payload)=>(dispatch)=>{
    return fetch("https://arbaserver.onrender.com/Resetpassword",{
    method:"post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    }).then( (res) => { 
      res.json() .then(res=>{
        alert(res.msg)
        if(res.msg !== "User Not Exits!"){
            window.location.href="/"
        }
      })
    })
    .catch((err)=>{
      alert(err);
    })
  }

  export const regiterUser = (payload) => (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
  return fetch("https://arbaserver.onrender.com/signup", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(payload)
  })
  .then( (res) => { 
    let data = res.json() .then(res=>{console.log(res)
    alert(res.msg);
    saveLocalData("token",res.token)
  })
    
  })
  .catch((err)=>{
    alert(err);
  })
  };

  export const checkUser = (payload) => async(dispatch) => {
    
    dispatch({ type: LOGIN_REQUEST });
  return fetch("https://arbaserver.onrender.com/login", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(payload)
        })
        .then( (res) => { 
          let data = res.json() .then(res=>{console.log(res)
          alert(res.msg);
          saveLocalData("token",res.token)
        })    
        .catch(err=>{
          console.log("try",err.msg);
        })      
        })
        .catch((err)=>{
          console.log(err);
          alert("Something went wrong");
        })
  };

  export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT_USER });
  };