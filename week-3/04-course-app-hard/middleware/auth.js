const Admin = require('../models/Admin')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

async function authenticateAdmin(req,res,next) {
    try {
    const token=req.headers.authorization.split(" ")[1]
    const payload=jwt.verify(token,saltValue)
    if(payload.username){
    let user= await Admin.findOne({username:(payload?.username)})
    req.admin=user;
    next()
  }
  else{
    res.status(403).send("Invalid bearer token! Access Forbidden")
  }
  }
  catch(err) {
    console.error(err.message)
    console.log("Error retreiving Bearer Token")
    res.status(403).send(err.message)
  }
  }

async function authenticateUser(req,res,next) {
    try{
    const token=req.headers.authorization.split(" ")[1]
    const payload=jwt.verify(token,saltValue)
    console.log(payload)
    if(payload.username){
    let user= await User.findOne({username: payload.username})
    req.user=user;
    next()
  }
  else{
    res.status(403).send("Invalid bearer token! Access Forbidden")
  }
  }
  catch(err){
    console.error(err.message)
    console.log("Error in Authorization")
    res.status(403).send(err.message)
  }
  }

  module.exports= { authenticateAdmin, authenticateUser}