import React,{useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useStorage from "./useStorage";
import Course from "./Course";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

function ShowCourse() {
    const [course, setCourse] = React.useState({});
    const [token,setToken] = useStorage("token")
    let navigate=useNavigate()
    const { id }= useParams()
    useEffect(()=> {
        if(token==0){
            navigate('/login')
            return;
        }
        const setter=(data)=>{
            setCourse(data)
        }
        let req=async ()=>{ 
        try{
            let res= await axios.get("http://localhost:3000/admin/course/"+id,{
            headers:{
                "authorization":"Bearer "+token
            }
            })
            setter(res.data)
        } catch(err) {
            console.error(err.response.data)
            if(err.response.status==403) {
               setToken('0')
            }
        }
        }
        req()
    },[token])

    return (<Container maxWidth="lg" >
        <Typography align="center" variant="h4" my={4}>{course?.title}</Typography>
       { course?.title ?  <Course course={course} />:<div>Course not Found</div>}
       </Container>)
}

export default ShowCourse;