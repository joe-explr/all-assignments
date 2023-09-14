import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import usernameVal from "../recoil/username/usernameAtom";


function Landing() {
    const [username]=useRecoilValue(usernameVal)
    let navigate=useNavigate()
    useEffect(()=>{
        if(username){
            navigate('/courses')
        }
    },[username])

    return (
    <div className="landing">
        <h1>Welcome to course selling website!</h1>
        <Link to='/signup'>Register</Link>
        <br/>
        <Link to="/login">Login</Link>
    </div>)
}

export default Landing;