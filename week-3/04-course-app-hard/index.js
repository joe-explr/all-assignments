const express = require('express');
const app = express();
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const saltValue="SampletokenKey"

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String
})
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Course = mongoose.model('Course', courseSchema);

mongoose.connect('mongodb+srv://kirattechnologies:iRbi4XRDdM7JMMkl@cluster0.e95bnsi.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

function adminAuth(req,res,next){
  const token=req.headers.Authorization.split(" ")[1]
  const payload=jwt.verify(token,saltValue)
  if(payload.username){
  let user= Admin.findOne({username})
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
  if(payload.username){
  let user= User.findOne({username})
  req.user=user;
  next()
}
else{
  res.status(403).send("Invalid bearer token! Access Forbidden")
}
}

// Admin routes
app.post('/admin/signup', async (req, res) => {
  const {username, password}= req.body
  const user=Admin.find((adm)=>{
    return adm.username==username
  })
  console.log(user)
  if(user) {
    res.status(403).send("Admin username already exists!")
  }
  else{
  admId++;
  Admin.push({admId,username, password});
  await fs.writeFile('admin.json',JSON.stringify(Admin))
  res.status(201).json({"message":"Admin User created successfully !"})
  }
});

app.post('/admin/login', (req, res) => {
  const {username, password}= req.body
  const admin=Admin.findOne({ username, password })

  if(admin) {
    let token= jwt.sign({ username, role: 'admin' },saltValue,{expiresIn:'1h'})
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
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({ message: 'Course created successfully', courseId: course.id })
});

app.put('/admin/courses/:courseId', adminAuth , async (req, res) => {
const Id = req.params.courseId
const { title, description, price, imageLink, published ,courseId}= req.body
let course = Course.findByIdAndUpdate(Id,{ title, description, price, imageLink, published ,courseId},{new :true})
if(course){
  res.status(201).send("Successfully Updated!!")
}
else{
  res.status(404).send("Course ID not found!")}
});

app.get('/admin/courses', adminAuth , async (req, res) => {
  let course = await Course.find({})
  res.status(201).json({course})
});

// User routes
app.post('/User/signup', async (req, res) => {
  const {username, password}= req.body
  const user=User.findOne({username, password})
  if(user) {
    res.status(403).send("User username already exists!")
  }
  else {
    usrId++;
    let newUser= new User({username, password,purchasedCourses:[]});
    await newUser.save()
    res.status(201).json({"message":" User created successfully !"})
  }
});

app.post('/User/login', (req, res) => {
  const {username, password}= req.body
  const user=User.findOne({username, password})
  if(user) {
    let token= jwt.sign({username,role:'user'},saltValue,{expiresIn:'1h'})
    res.status(200).json({"message":"Logged in successfully",token})
  }
  else{
  res.status(403).send("Wrong Credentials!")
  }
});

app.get('/User/courses',userAuth, async (req, res) => {
  let courses = await Course.find({})
  res.status(200).json({courses})
});

app.post('/User/courses/:courseId',userAuth , async (req, res) => {
const Id = req.params.courseId
let course= Course.findById(Id)
if(course && course.published){
  req.user.purchasedCourses.push(course.courseId)
  await User.findByIdAndUpdate(req.user.id,req.user)
  res.status(200).send("Purchased course successfully !")
}
else{
  res.status(404).send("Course not Found or published")
}
});

app.get('/User/purchasedCourses',userAuth , (req, res) => {
  res.status(200).json(req.user.purchasedCourses)
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
