const Course = require('../../models/Course')

const CreateCourse = async (req, res) => {
    const { title, description, price, imageLink, published } = req.body
    if(!title|| !description||!price||!imageLink) {
      res.status(400).send("Incomplete Course Info")
    }
    const course = await Course.create({ title, description, price, imageLink, published });
    res.status(201).json({ message: 'Course created successfully', courseId: course._id })
  };
  
const UpdateCourse =  async (req, res) => {
  const Id = req.params.courseId
  const { title, description, price, imageLink, published ,courseId}= req.body
  let course = await Course.findByIdAndUpdate({Id},{ title, description, price, imageLink, published ,courseId},{new :true})
  if(course){
    res.status(201).send("Successfully Updated!!")
  }
  else{
    res.status(404).send("Course ID not found!")}
  };
  
const queryCourse = async (req, res) => {
    const Id = req.params.courseId
    let reqCourse= await Course.findOne({_id:Id})
    if(reqCourse) {
      res.status(200).json(reqCourse)
    }
    else {
      res.status(404).send("Course ID not found!")
    }
    };
  
const getAll = async (req, res) => {
    let courses = await Course.find({})
    res.status(201).json({courses})
  };
  
const Me = (req, res) => {
    res.status(200).json(req.admin.username)
  };
  
  module.exports= {
    CreateCourse,
    UpdateCourse,
    queryCourse,
    getAll,
    Me
  }