const express = require('express');
const app = express();
const jwt=require('jsonwebtoken')
const cors = require('cors')
const mongoose=require('mongoose')
const saltValue="SampletokenKey"

app.use(express.json());
app.use(cors());

const {authenticateAdmin, authenticateUser}= require('./middleware/auth')

const adminAuthRouter = require('./routes/Admin/Auth');
const adminCoursesRouter = require('./routes/Admin/Course');
// routes
app.use('/admin', adminAuthRouter);
app.use('/admin', authenticateAdmin, adminCoursesRouter);

const userAuthRouter = require('./routes/User/Auth');
const userCoursesRouter = require('./routes/User/Course');
// routes
app.use('/users', userAuthRouter);
app.use('/users', authenticateUser, userCoursesRouter);

mongoose.connect('mongodb+srv://joe:mongopass@courses.h30tcdg.mongodb.net/Courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Courses" }).then((val)=>{
  console.log("Connected to Db!! "+val)
}).catch(err => console.log(err));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// const AdminSchema = new mongoose.Schema({
//   username: String,
//   password: String
// })
// const UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
// })
// const courseSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   imageLink: String,
//   published: {type: Boolean, default: false},
// })

// const User = mongoose.model('User', UserSchema);
// const Admin = mongoose.model('Admin', AdminSchema);
// const Course = mongoose.model('Course', courseSchema);



// async function adminAuth(req,res,next){
//   try {
//   const token=req.headers.authorization.split(" ")[1]
//   const payload=jwt.verify(token,saltValue)
//   if(payload.username){
//   let user= await Admin.findOne({username:(payload?.username)})
//   req.admin=user;
//   next()
// }
// else{
//   res.status(403).send("Invalid bearer token! Access Forbidden")
// }
// }
// catch(err) {
//   console.error(err.message)
//   console.log("Error retreiving Bearer Token")
//   res.status(403).send(err.message)
// }
// }
// async function userAuth(req,res,next){
//   try{
//   const token=req.headers.authorization.split(" ")[1]
//   const payload=jwt.verify(token,saltValue)
//   console.log(payload)
//   if(payload.username){
//   let user= await User.findOne({username: payload.username})
//   req.user=user;
//   next()
// }
// else{
//   res.status(403).send("Invalid bearer token! Access Forbidden")
// }
// }
// catch(err){
//   console.error(err.message)
//   console.log("Error in Authorization")
//   res.status(403).send(err.message)
// }
// }

// // Admin routes
// app.post('/admin/signup', async (req, res) => {
//   try {
//   const {username, password}= req.body
//   const user= await Admin.findOne({username})
//   console.log(user)
//   if(user) {
//     res.status(403).send("Admin username already exists!")
//   }
//   else{
//   await Admin.create({username, password});
//   let token= jwt.sign({ username, role: 'admin' },saltValue,{expiresIn:'1h'})
//   res.status(201).json({"message":"Admin User created successfully !",token})
//   }
// }
// catch(err){
//   res.status(500).send(err.message)
// } } );

// app.post('/admin/login', async (req, res) => {
//   const {username, password}= req.body
//   const admin=await Admin.findOne({ username, password })
//   if(admin) {
//     let token= jwt.sign({ username, role: 'admin' },saltValue,{expiresIn:'1h'})
//     res.status(200).json({"message":"Logged in successfully",token})
//   }
//   else{
//   res.status(403).send("Invalid Credentials!")
//   }
// });

// app.post('/admin/course',adminAuth, async (req, res) => {
//   const { title, description, price, imageLink, published } = req.body
//   if(!title|| !description||!price||!imageLink) {
//     res.status(400).send("Incomplete Course Info")
//   }
//   const course = await Course.create({ title, description, price, imageLink, published });
//   res.status(201).json({ message: 'Course created successfully', courseId: course._id })
// });

// app.put('/admin/course/:courseId', adminAuth , async (req, res) => {
// const Id = req.params.courseId
// const { title, description, price, imageLink, published ,courseId}= req.body
// let course = await Course.findByIdAndUpdate({Id},{ title, description, price, imageLink, published ,courseId},{new :true})
// if(course){
//   res.status(201).send("Successfully Updated!!")
// }
// else{
//   res.status(404).send("Course ID not found!")}
// });

// app.get('/admin/course/:courseId', adminAuth , async (req, res) => {
//   const Id = req.params.courseId
//   let reqCourse= await Course.findOne({_id:Id})
//   if(reqCourse) {
//     res.status(200).json(reqCourse)
//   }
//   else {
//     res.status(404).send("Course ID not found!")
//   }
//   });

// app.get('/admin/courses', adminAuth , async (req, res) => {
//   let courses = await Course.find({})
//   res.status(201).json({courses})
// });

// app.get('/admin/me', adminAuth , (req, res) => {
//   res.status(200).json(req.admin.username)
// });

// // User routes
// app.get('/users/me', userAuth , (req, res) => {
//   res.status(200).json({username:(req.user.username)})
// });

// app.post('/users/signup', async (req, res) => {
//   const {username, password}= req.body
//   const user=await User.findOne({username, password})
//   if(user) {
//     res.status(403).send("User username already exists!")
//   }
//   else {
//     let token= jwt.sign({username,role:'user'},saltValue,{expiresIn:'1h'})
//     let newUser= new User({username, password,purchasedCourses:[]});
//     await newUser.save()
//     res.status(201).json({"message":" User created successfully !",token})
//   }
// });

// app.post('/users/login', async (req, res) => {
//   const {username, password}= req.body
//   const user= await User.findOne({username, password})
//   if(user) {
//     let token= jwt.sign({username,role:'user'},saltValue,{expiresIn:'1h'})
//     res.status(200).json({"message":"Logged in successfully",token})
//   }
//   else{
//   res.status(403).send("Wrong Credentials!")
//   }
// });

// app.get('/users/courses',userAuth, async (req, res) => {
//   let courses = await Course.find({"published":true})
//   res.status(200).json({courses})
// });

// app.post('/users/course/:courseId',userAuth , async (req, res) => {
// const Id = req.params.courseId
// let course= await Course.findById({Id})
// if(course && course.published) {
//   req.user.purchasedCourses.push(course.courseId)
//   await User.findByIdAndUpdate({username:(req.user.username)},{...(req.user)})
//   res.status(200).send("Purchased course successfully !")
// }
// else{
//   res.status(404).send("Course not Found or published")
// }
// });

// app.get('/users/purchasedCourses',userAuth , async (req, res) => {
//   const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
//   if (user) {
//     res.json({ purchasedCourses: user.purchasedCourses || [] });
//   } else {
//     res.status(403).json({ message: 'User not found' });
//   }});
