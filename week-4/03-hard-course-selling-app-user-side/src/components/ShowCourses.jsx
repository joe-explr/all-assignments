import React,{useEffect} from "react";
import {Box, Container, Typography,Grid,Button} from '@mui/material';
import {Card,CardActionArea,CardMedia,CardContent,CardActions} from '@mui/material';
import { useNavigate } from "react-router-dom";
import userActions from "../actions/userActions";
import {useRecoilValue } from "recoil";
import usernameVal from "../recoil/username/usernameAtom";

function ShowCourses() {
    const {queryApi}=userActions();
    const [courses, setCourses] = React.useState([]);
    const username = useRecoilValue(usernameVal)
    let navigate=useNavigate()
    useEffect(()=> {
        if(!username){
            navigate('/login')
            return
        }
        let req=async ()=>{ 
        try{
        let res= await queryApi("courses",{},"GET")
        setCourses(res.data.courses)
        } catch(err) {
            console.error(err)
        }
    }
    req()
    },[username])
    return( 
    <Container maxWidth="xl">
        <Typography
        variant="h2"
        textAlign={"center"}>Courses</Typography>
        {courses ? (<Grid container spacing={4} py={3}>{courses?.map(c => 
            {
            return (<Grid item xs={12} sm={6} lg={3} key={c._id}>
            <Course course={c} />
            </Grid>)
        })}
        </Grid>):(<p>No courses to show</p>)}
        </Container>
    )
}

function Course({course:{ title, description, price, imageLink, published,_id}}) {
    let navigate=useNavigate()
    let viewCourse=(id)=>{
        navigate('/course/'+id)
    }
    let purchaseCourse=async (id) => {
      try{
        let res= await queryApi("course/"+id,{"_timestamp": Date.now()},"POST")
        } catch(err) {
            console.error(err)
        }    
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
          Reviews
        </Button>
        <Button size="small" 
          color="primary"
          onClick={()=>purchaseCourse(_id)}>
          Add to Cart
        </Button>
      </CardActions>       
    </Card>)

}

export default ShowCourses;