import {
    CHECK_REGISTER_USER_ERROR,
    CHECK_REGISTER_USER_REQUEST,
    CHECK_REGISTER_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
  } from "./action.type";

  import axios from "axios";

  import {saveLocalData} from "../../Utils/localStorage"

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
    dispatch({ type: CHECK_REGISTER_USER_REQUEST });
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
          console.log("try",err);
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