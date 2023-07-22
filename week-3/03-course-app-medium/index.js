const express = require('express');
const app = express();
const jwt=require('jsonwebtoken')
const fs=require('fs');
const { exit } = require('process');

app.use(express.json());
try{
let ADMINS = JSON.parse(await fs.readFile('admins.json'));
let USERS = JSON.parse(await fs.readFile('users.json'));
let COURSES = JSON.parse(await fs.readFile('courses.json'));
}
catch(err){
  console.log("Error accessing Data Files")
  process.exit(0)
}
let admId,courseId,usrId;
admId=courseId=usrId=0
const saltValue="SampletokenKey"

function adminAuth(req,res,next){
  const token=req.headers.Authorization.split(" ")[1]
  const payload=jwt.verify(token,saltValue)
  if(payload){
  let user= ADMINS.find((usr)=>{
  return  payload.id==user.id
  })
  req.admin=user;
  next()
}
else{
  res.status(403).send("Invalid bearer token! Access Forbidden")
}
}
function userAuth(req,res,next){
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

// Admin routes
app.post('/admin/signup', async (req, res) => {
  const {username, password}= req.body
  const user=ADMINS.find((adm)=>{
    return adm.username==username
  })
  console.log(user)
  if(user) {
    res.status(403).send("Admin username already exists!")
  }
  else{
  admId++;
  ADMINS.push({admId,username, password});
  await fs.writeFile('admin.json',JSON.stringify(ADMINS))
  res.status(201).json({"message":"Admin User created successfully !"})
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
    res.status(201).json({"message":"Logged in successfully",token})
  }
  else{
  res.status(403).send("Wrong Credentials!")
  }
});

app.post('/admin/courses',adminAuth, async (req, res) => {
  const { title, description, price, imageLink, published } = req.body
  if(!title|| !description||!price||!imageLink) {
    res.status(400).send("Incomplete Course Info")
  }
  courseId++
  COURSES.push({ title, description, price, imageLink, published ,courseId})
  await fs.writeFile('admin.json',JSON.stringify(ADMINS))
  res.status(201).json({ message: 'Course created successfully', courseId })
});

app.put('/admin/courses/:courseId', adminAuth , async (req, res) => {
const Id = req.params.courseId
const { title, description, price, imageLink, published ,courseId}= req.body
let ind= COURSES.findIndex((item)=>{
return item.courseId==Id
})
if(ind!=-1){
  COURSES[ind]={ title, description, price, imageLink, published ,courseId}
  await fs.writeFile('courses.json',JSON.stringify(COURSES))
  res.status(201).send("Successfully Updated!!")
}
else{
  res.status(404).send("Course ID not found!")}
});

app.get('/admin/courses', adminAuth , (req, res) => {
  res.status(201).json(COURSES)
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
    await fs.writeFile('users.json',JSON.stringify(USERS))
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
  await fs.writeFile('users.json',JSON.stringify(USERS))
  res.status(200).send("Purchased course successfully !")
}
else{
  res.status(404).send("Course not Found or published")
}
});

app.get('/users/purchasedCourses',userAuth , (req, res) => {
  res.status(200).json(req.user.purchasedCourses)
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
