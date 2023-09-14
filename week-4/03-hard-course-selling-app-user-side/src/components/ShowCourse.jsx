import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import userActions from "../actions/userActions";
import Course from "./Course";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import usernameVal from "../recoil/username/usernameAtom";

function ShowCourse() {

    const {queryApi} = userActions();
    const [course, setCourse] = React.useState({});
    const [username,setUsername]=useRecoilState(usernameVal)
    let navigate=useNavigate()
    const { id }= useParams()
    React.useEffect(()=> {
        if(!username){
            navigate('/login')
            return;
        }
        const setter=(data)=>{
            setCourse(data)
        }
        let req=async ()=>{ 
        try{
            let res= await queryApi("course/"+id,{},"GET")
            setter(res.data)
        } catch(err) {
            console.error(err)
        }
        }
        req()
    },[username])

    return (<Container maxWidth="lg" >
        <Typography align="center" variant="h4" my={4}>{course?.title}</Typography>
       { course?.title ?  <Course course={course} />:<div>Course not Found</div>}
       </Container>)
}

export default ShowCourse;