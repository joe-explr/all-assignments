import React,{useEffect} from "react";
import { Container, Typography,Grid,Button} from '@mui/material';
import {Card,CardActionArea,CardMedia,CardContent,CardActions} from '@mui/material';
import { useNavigate } from "react-router-dom";
import userActions from "../actions/userActions"
import { useRecoilValue } from "recoil";
import usernameVal from "../recoil/username/usernameAtom";

function PurchasedCourses() {
  const {queryApi}=userActions();
    const [courses, setCourses] = React.useState([]);
    const username = useRecoilValue(usernameVal)
    let navigate=useNavigate()
    
    useEffect(()=> {
      if(!username){
            navigate('/login')
            return
        }
        console.log(username)
      let req = async () => { 
        try{
        let res= await queryApi("purchasedCourses",{},"GET")
        setCourses(res.data.purchasedCourses)
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
        textAlign={"center"}>My Learnings</Typography>
        {courses ? (<Grid container spacing={4} py={3}>{courses?.map(c => 
            {
            return (<Grid item xs={12} sm={6} lg={3} key={c.courseId}>
            <Course course={c} />
            </Grid>)
        })}
        </Grid>):(<p>No courses to show</p>)}
        </Container>
    )
}

function Course({course:{ title, description, price, imageLink, published,courseId}}) {
    let navigate=useNavigate()
    let viewCourse=(id)=>{
        navigate('/course/'+id)
    }
    return(
    <Card key={courseId}>
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
            onClick={()=>viewCourse(courseId)}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          
           <Typography gutterBottom 
           variant="body2" 
           component="div"
           onClick={()=>viewCourse(courseId)}>{published? "Available":"To be Released Soon"}
           </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Review
        </Button>
      </CardActions>       
    </Card>)

}

export default PurchasedCourses;