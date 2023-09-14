const User = require('../../models/User')
const jwt=require('jsonwebtoken')

const Signup = async (req, res) => {
    const {username, password}= req.body
    const user=await User.findOne({username, password})
    if(user) {
      res.status(403).send("User username already exists!")
    }
    else {
      let token= jwt.sign({username,role:'user'},saltValue,{expiresIn:'1h'})
      let newUser= new User({username, password,purchasedCourses:[]});
      await newUser.save()
      res.status(201).json({"message":" User created successfully !",token})
    }
  };
  
const login = async (req, res) => {
    const {username, password}= req.body
    const user= await User.findOne({username, password})
    if(user) {
      let token= jwt.sign({username,role:'user'},saltValue,{expiresIn:'1h'})
      res.status(200).json({"message":"Logged in successfully",token})
    }
    else{
    res.status(403).send("Wrong Credentials!")
    }
  };

module.exports= {Signup, login}
  