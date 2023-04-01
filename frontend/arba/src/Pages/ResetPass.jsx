import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { reset } from '../Redux/AuthReducer/action';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlereset=()=>{
        dispatch(reset({email}))
        navigate("/")
    }
  return (
    <div>
        <h1>Enter your Email_Id here...</h1>
        <input type="email" onChange={e=>setEmail(e.target.value)} />
        <button onClick={handlereset}>Get Reset Link</button>
    </div>
  )
}

export default ResetPass