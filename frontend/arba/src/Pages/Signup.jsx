import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import {regiterUser} from "../Redux/AuthReducer/action"
import { Link } from "react-router-dom";
import "./Signup.css"

const Signup = () => {
  const dispatch = useDispatch();
    const [fullName,setFullName] = useState("");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [avatar,setAvatar] = useState("");

    const handlesignup=()=>{
        const payload = {fullName,userName,email,password,avatar};
        dispatch(regiterUser(payload))
    }
  return (
    <div>
      <h1>Signup</h1>
        <div className="body">
            <div className="name">
                <label>FullName : </label>
                <input onChange={(e)=>setFullName(e.target.value)} type="text" id="name" />
            </div>
            <div className="user">
                <label>UserName : </label>
                <input onChange={(e)=>setUserName(e.target.value)} type="text" id="user" />
            </div>
            <div className="email">
                <label>Email_Id : </label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
            </div>
            <div className="pass">
                <label>Password : </label>
                <input onChange={(e)=>setPassword(e.target.value)} type="email" id="pass" />
            </div>
            <div className="avatar">
                <label>Avatar : </label>
                <input onChange={(e)=>setAvatar(e.target.value)} type="text" id="avatar" />
            </div>
            <button onClick={handlesignup}>Signup</button>
            <div>
              <Link to={"/login"} >Already an user</Link>
            </div>
        </div>
    </div>
  )
}

export default Signup