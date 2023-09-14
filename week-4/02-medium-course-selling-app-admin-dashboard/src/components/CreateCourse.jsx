import React from "react";
import { useNavigate} from 'react-router-dom'
import useStorage from "./useStorage";
import {TextField, Typography, Card, CardActions, CardContent, Container, Button} from "@mui/material";

function CreateCourse() {

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [image, setImage] = React.useState("");
    const [published, setPublished] = React.useState(false);
    const [valid, setValid] = React.useState(true);
    const [token,setToken]=useStorage("token")
    
    let navigate=useNavigate()
    React.useEffect(()=>{
    if(token==0){
        navigate('/login')
    }
   },[])
    const createCourse = async ()=> {
        try{
        let response=await axios.post("http://localhost:3000/admin/course",
        { title, description, price, "imageLink":image, published },
        {
            headers:{
                "Authorization":"Bearer "+token,
            }
        })
            navigate('/courses'+response.data.courseId)
    }
    catch(err){
        if(err.response.status==403) {
            setValid(false)
        }
        console.error(err)
    }
    }
    if(token==0){
        return(<div>Please Log In</div>);
    }
    return (<Container maxWidth="lg" className={"course-form"}>
            <Typography
             variant="h5"
             textAlign={"center"}
             my={5}>Create Course Page</Typography>
            <Card sx={{maxWidth:1/2,
                       margin:"auto",
                       alignSelf:"center",
                       padding:"10px"}} >
            <CardContent
            sx={
                {maxWidth:3/4,
                 display:"flex",
                 flexDirection: 'column',
                 justifyContent:"space-evenly",
                 alignItems:"center"}}>

             {!valid&& <div>Error Creating course. Backend Error</div>}
            
            <TextField   
                label="Title"
                fullWidth 
                variant="standard" 
                onChange={e => setTitle(e.target.value)}
                size="small"
                margin="normal"/>

            <TextField   
                label="Description"
                fullWidth  
                variant="standard" 
                onChange={e => setDescription(e.target.value)}
                size="small"
                margin="normal"/>
                
            <TextField   
                label="Price"
                fullWidth  
                variant="standard" 
                onChange={e => setPrice(e.target.value)}
                size="small"
                margin="normal"/>

            <TextField   
                label="Image Link"
                fullWidth 
                variant="standard" 
                onChange={e => setImage(e.target.value)}
                size="small"
                margin="normal"/>
            <TextField   
                label="Published"
                fullWidth  
                variant="standard" 
                onClick={e => setPublished(!published)}
                size="small"
                margin="normal"/>
                </CardContent>
                <CardActions>
                <Button variant="outlined"
                onClick={createCourse}>Create Course</Button>
                </CardActions> 
            </Card>
        </Container>)
}
export default CreateCourse;