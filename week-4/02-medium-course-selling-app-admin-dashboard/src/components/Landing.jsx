import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import useStorage from "./useStorage";


function Landing() {
    const [token,setToken]= useStorage("token")
    let navigate=useNavigate()
    useEffect(()=>{
        if(token!='0'){
            navigate('/courses')
        }
    },[token])

    return (
    <div className="landing">
        <h1>Welcome to course selling website!</h1>
        <Link to='/register'>Register</Link>
        <br/>
        <Link to="/login">Login</Link>
    </div>)
}

export default Landing;