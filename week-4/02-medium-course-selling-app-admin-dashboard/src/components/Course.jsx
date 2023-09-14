import React,{useEffect, useState} from "react";
import axios from "axios";
import useStorage from "./useStorage";
import {Card, CardActions, CardMedia, TextField, Typography,Button, CardContent} from "@mui/material";


function Course({course}) {
    
    const [C,setC]=useState(course)
    const [edit,setEdit]=useState(false)
    const [token,setToken] = useStorage("token")

    let req=async ()=>{ 
        let res= await axios.put("http://localhost:3000/admin/course/"+C.courseId,C,{
        headers:{
            "authorization":"Bearer "+token
        }
        })
        console.log("Sent Request succesfully !")
    }

    return (<Card sx={{maxWidth:1/2,margin:"auto"}}>
        <CardMedia
         component="img"
         image={C?.imageLink}
         sx={{objectFit: "contain"}}/>
        <CardContent
        sx={
        {maxWidth: 3/4,
         display:"flex",
         flexDirection: 'column',
         justifyContent:"space-evenly"}}>
        <TextField  
         defaultValue={C?.title}
         disabled={!edit} 
         label="Title" 
         variant="standard" 
         onChange={e => setC({...C,title:(e.currentTarget.textContent)})} 
         size="small"
         margin="normal"
         />

        <TextField  defaultValue={C?.description}
         disabled={!edit}  
         label="Description" 
         variant="standard" 
         onChange={e => setC({...C,description:(e.currentTarget.textContent)})} 
         size="small"
         margin="normal"
         />

        <TextField  defaultValue={C?.price}
         disabled={!edit} 
         label="Price" 
         variant="standard" 
         onChange={e => setC({...C,price:(e.currentTarget.textContent)})} 
         size="small"
         margin="normal"
         />

        <Typography gutterBottom 
           variant="body2" 
           component="div">{C?.published? "Available":"To be Released Soon"}
        </Typography>
        </CardContent>
        <CardActions>
        {edit ? (<Button 
        size="small" 
        color="secondary"
        variant="outlined"
        onClick={()=>{setEdit(!edit); req();}}>
          Submit
        </Button>)
        :(<Button 
        size="small" 
        color="secondary"
        variant="outlined"
        onClick={()=>setEdit(!edit)}>
        Edit
        </Button>)}
        </CardActions>
    </Card>)
}


export default Course;