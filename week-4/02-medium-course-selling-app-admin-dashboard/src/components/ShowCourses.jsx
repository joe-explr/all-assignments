import React,{useEffect} from "react";
import {Box, Container, Typography,Grid,Button} from '@mui/material';
import {Card,CardActionArea,CardMedia,CardContent,CardActions} from '@mui/material';
import { useNavigate } from "react-router-dom";
import useStorage from "./useStorage";
import axios from "axios";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const [token,setToken] = useStorage("token")
    let navigate=useNavigate()
    useEffect(()=> {
        if(token=='0'){
            navigate('/login')
            return
        }
        let req=async ()=>{ 
        try{
        let res= await axios.get("http://localhost:3000/admin/courses",{
        headers:{
            "authorization":"Bearer "+token
        }
        })
        setCourses(res.data.courses)
        } catch(err) {
            console.error(err.response.data)
            if(err.response.status==403) {
                setToken('0')
                window.location.reload()
            }
        }
    }
    req()
    },[token])
    return( 
    <Container maxWidth="xl">
        <Typography
        variant="h2"
        textAlign={"center"}>Courses</Typography>
        {courses ? (<Grid container spacing={4} py={3}> {courses.map(c => 
            {
            return (<Grid item xs={12} sm={6} lg={3} key={c._id}>
            <Course course={c} />
            </Grid>)
        })}
        </Grid>):(<p></p>)}
        </Container>
    )
}

function Course({course:{ title, description, price, imageLink, published,_id}}) {
  console.log()
    let navigate=useNavigate()
    let viewCourse=(id)=>{
        navigate('/course/'+id)
    }
    return(
    <Card key={_id}>
        <CardActionArea>
        <CardMedia
          component="img"
          height="60%"
          image={imageLink}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom 
            variant="h6" 
            component="div"
            onClick={()=>viewCourse(_id)}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          
           <Typography gutterBottom 
           variant="body2" 
           component="div"
           onClick={()=>viewCourse(_id)}>{published? "Available":"To be Released Soon"}
           </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent:"space-between"}}>
        <Button size="small" color="primary">
          Share
        </Button>
        <Typography variant="body1" color="text.secondary" sx={{display:"inline"}}>
          ${price}
        </Typography>
      </CardActions>
      </Card>)

}

export default ShowCourses;