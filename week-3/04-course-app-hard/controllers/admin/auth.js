const Admin = require('../../models/Admin')
const jwt=require('jsonwebtoken')

const Signup = async (req, res) => {
    try {
    const {username, password}= req.body
    const user= await Admin.findOne({username})
    console.log(user)
    if(user) {
      res.status(403).send("Admin username already exists!")
    }
    else{
    await Admin.create({username, password});
    let token= jwt.sign({ username, role: 'admin' },saltValue,{expiresIn:'1h'})
    res.status(201).json({"message":"Admin User created successfully !",token})
    }
  }
  catch(err){
    res.status(500).send(err.message)
  } };
  
const login = async (req, res) => {
    const {username, password}= req.body
    const admin=await Admin.findOne({ username, password })
    if(admin) {
      let token= jwt.sign({ username, role: 'admin' },saltValue,{expiresIn:'1h'})
      res.status(200).json({"message":"Logged in successfully",token})
    }
    else{
    res.status(403).send("Invalid Credentials!")
    }
  };

module.exports= {Signup, login}
  