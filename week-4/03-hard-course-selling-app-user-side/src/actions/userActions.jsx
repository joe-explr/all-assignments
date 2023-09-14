import axios from "axios";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import usernameVal from "../recoil/username/usernameAtom";
import tokenVal from "../recoil/token/tokenAtom";

function userActions(){

let navigate = useNavigate()
const [token,setToken] = useRecoilState(tokenVal)
const [username,setUsername] = useRecoilState(usernameVal)

React.useEffect(() => {
    let queryUser= async()=>{
        try{
        let res = await queryApi("me",{},"GET")
        setUser(res.data.username)
        }catch(err){
          console.log(err);
        }}
        if(token!='0'&& username==''){
        queryUser();
        }
},[token])
React.useEffect(() => {
    console.log(username)
},[username])

const login=async (body) => {
    let response=await queryApi("login",
    body,"POST")
    setter(response.data.token);

};

const setter=(val)=>{
    localStorage.setItem("token",val);
    return setToken((old)=>{return val.toString()})
}
const setUser=(user)=>{
    localStorage.setItem("user",user);
    return setUsername(user)
}
const logout=()=>{
    setToken((val)=>{return "0"});
    setUsername((val)=>{return ""});
    navigate('/login')
}
const queryApi = async (path,body={},action)=>{

    const base="http://localhost:3000/users/"
    const url=base+path;
    let res;
    try{
    switch(action){
        case 'GET':{
            res= await axios.get(url,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            })
            return res;
        };
        case 'POST':{
            res= await axios.post(url,body,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            })
            return res;
        };
        case 'PUT':{
            res= await axios.put(url,body,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            })
            return res;
        };
        case 'PATCH':{
            res= await axios.patch(url,body,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            })
            return res;
        };
        default:{
            console.log("Invalid Action");
            break;
        };

    }
}   catch(err){
    console.error(err)
    if(err.response.status==403) {
        setToken((val)=>{localStorage.removeItem("token");return "0"})
        setUsername((val)=>{return ""})
        navigate('/')
    }
    throw new Error("failed to query");
}
return;
}
return {login,logout,queryApi,setter,setUser};
}
export default  userActions;