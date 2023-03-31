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
  return axios
    .post(`https://near1499server.herokuapp.com/users`, payload)
    .then((r) => dispatch({ type: REGISTER_USER_SUCCESS, payload: r }))
    .catch((err) => dispatch({ type: REGISTER_USER_ERROR, payload: err }));
  };

  export const checkUser = (payload) => async(dispatch) => {
    dispatch({ type: CHECK_REGISTER_USER_REQUEST });
  return fetch("http://localhost:5000/login", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(payload)
        })
        .then( (res) => { 
          let data = res.json() .then(res=>{console.log(res)
          alert(res.msg)})
          
        })
        .catch((err)=>{
          console.log(err);
        })
  };

  export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT_USER });
  };