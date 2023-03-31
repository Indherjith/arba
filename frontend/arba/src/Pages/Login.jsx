import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import {checkUser} from "../Redux/AuthReducer/action"

const Login = () => {

    const dispatch = useDispatch();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin=()=>{
        const payload = {email,password};
        dispatch(checkUser(payload))
    }

  return (
    <div>
        <h1>Login</h1>
        <div className="body">
            <div className="email">
                <label>Email_Id : </label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
            </div>
            <div className="pass">
                <label>Password : </label>
                <input onChange={(e)=>setPassword(e.target.value)} type="email" id="pass" />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    </div>
  )
}

export default Login