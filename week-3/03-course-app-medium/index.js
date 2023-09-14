const express = require('express');
const app = express();
const jwt=require('jsonwebtoken')
const fs=require('fs');
const cors=require('cors');
const { exit } = require('process');

app.use(express.json());
app.use(cors());
var ADMINS,USERS,COURSES;
try{
ADMINS = JSON.parse(fs.readFileSync('admins.json'));
USERS = JSON.parse(fs.readFileSync('users.json'));
COURSES = JSON.parse(fs.readFileSync('courses.json'));
}
catch(err){
  console.log("Error accessing Data Files")
  process.exit(0)
}
let admId=0,courseId=0,usrId=0;
const saltValue="SampletokenKey"

function adminAuth(req,res,next){
  try {
  const token=req.headers.authorization.split(" ")[1]
  const payload=jwt.verify(token,saltValue)
  if(payload){
  let admin= ADMINS.find((adm)=>{
  return  payload.id==adm.id
  })
  req.admin=admin;
  next()
}
else{
  res.status(403).send("Invalid bearer token! Access Forbidden")
}
}
catch(err){
  console.error(err.message)
  console.log("Error retreiving Bearer Token")
  res.status(403).send(err.message)
}
}
function userAuth(req,res,next){
  try {
  const token=req.headers.Authorization.split(" ")[1]
  const payload=jwt.verify(token,saltValue)

  if(payload){
  let ind= USERS.findIndex((usr)=>{
   return payload.id==usr.id
  })
  req.user=USERS[ind];
  next()
}
else{
  res.status(403).send("Invalid bearer token! Access Forbidden")
}
}
catch(err){
  console.error(err)
  console.log("Error retreiving Bearer Token")
}
}

// Admin routes
app.post('/admin/signup', async (req, res) => {
  const {username, password}= req.body
  const admin=ADMINS.find((adm)=>{
    return adm.username==username
  })
  console.log(ADMINS)
  if(admin) {
    res.status(403).send("Admin username already exists!")
  }
  else{
  admId++;
  ADMINS.push({admId,username, password});
  fs.writeFileSync('admins.json',JSON.stringify(ADMINS))
  let token= jwt.sign({admId,username},saltValue,{expiresIn:'1h'})
  res.status(201).json({"message":"Admin User created successfully !",token})
  }
});

app.post('/admin/login', (req, res) => {
  const {username, password}= req.body
  console.log(ADMINS,username,password)
  const user=ADMINS.find((adm)=>{
    return (adm.username == username && adm.password == password)
  })

  if(user) {
    let token= jwt.sign({admId,username},saltValue,{expiresIn:'1h'})
    res.status(200).json({"message":"Logged in successfully",token})
  }
  else{
  res.status(403).send("Wrong Credentials!")
  }
});

app.post('/admin/course',adminAuth, async (req, res) => {
  const { title, description, price, imageLink, published } = req.body
  if(!title|| !description||!price||!imageLink) {
    res.status(400).send("Incomplete Course Info")
  }
  console
  courseId=((COURSES[COURSES.length -1]) ?(COURSES[COURSES.length -1]).courseId: 0) +1;
  COURSES.push({ title, description, price, imageLink, published ,courseId})
  fs.writeFileSync('courses.json',JSON.stringify(COURSES))
  res.status(201).json({ message: 'Course created successfully', courseId })
});

app.put('/admin/course/:courseId', adminAuth , async (req, res) => {
const Id = req.params.courseId
const { title, description, price, imageLink, published ,courseId}= req.body
let ind= COURSES.findIndex((item)=>{
return item.courseId==Id
})
if(ind!=-1){
  COURSES[ind]={ title, description, price, imageLink, published ,courseId}
  fs.writeFileSync('courses.json',JSON.stringify(COURSES))
  res.status(201).send("Successfully Updated!!")
}
else{
  res.status(404).send("Course ID not found!")}
});

app.get('/admin/course/:courseId', adminAuth , async (req, res) => {
  const Id = req.params.courseId
  let ind= COURSES.findIndex((item)=>{
  return item.courseId==Id
  })
  if(ind!=-1){
    res.status(200).json(COURSES[ind])
  }
  else{
    res.status(404).send("Course ID not found!")
  }
  });

app.get('/admin/courses', adminAuth , (req, res) => {
  res.status(200).json(COURSES)
});

app.get('/admin/me', adminAuth , (req, res) => {
  res.status(200).json(req.admin.username)
});

// User routes
app.post('/users/signup', async (req, res) => {
  const {username, password}= req.body
  const user=USERS.find((usr)=>{
    return usr.username==username
  })
  if(user) {
    res.status(403).send("User username already exists!")
  }
  else {
    usrId++;
    USERS.push({usrId,username, password,purchasedCourses:[]});
    fs.writeFileSync('users.json',JSON.stringify(USERS))
    res.status(201).json({"message":" User created successfully !"})
  }
});

app.post('/users/login', (req, res) => {
  const {username, password}= req.body
  const user=USERS.find((usr)=>{
    return (usr.username==username && adm.password==password)
  })
  if(user) {
    let token= jwt.sign({usrId,username},saltValue,{expiresIn:'1h'})
    res.status(200).json({"message":"Logged in successfully",token})
  }
  else{
  res.status(403).send("Wrong Credentials!")
  }
});

app.get('/users/courses',userAuth, (req, res) => {
  res.status(200).json(COURSES)
});

app.post('/users/courses/:courseId',userAuth , async (req, res) => {
const Id = req.params.courseId
let course= COURSES.find((item)=>{
return item.courseId==Id
})
if(course && course.published){
  req.user.purchasedCourses.push(course.courseId)
  fs.writeFileSync('users.json',JSON.stringify(USERS))
  res.status(200).send("Purchased course successfully !")
}
else{
  res.status(404).send("Course not Found or published")
}
});

app.get('/users/purchasedCourses',userAuth , (req, res) => {
  res.status(200).json(req.user.purchasedCourses)
});

app.all('*',(req,res)=>{
  res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
