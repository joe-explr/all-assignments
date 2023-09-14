const Course = require('../../models/Course')

const getAllCourses = async (req, res) => {
    let courses = await Course.find({"published":true})
    res.status(200).json({courses})
  }

const PurchaseCourse = async (req, res) => {
    const Id = req.params.courseId
    let course= await Course.findById({Id})
    if(course && course.published) {
      req.user.purchasedCourses.push(course.courseId)
      await User.findByIdAndUpdate({username:(req.user.username)},{...(req.user)})
      res.status(200).send("Purchased course successfully !")
    }
    else{
      res.status(404).send("Course not Found or published")
    }
    }

const Me = (req, res) => {
    res.status(200).json({username:(req.user.username)})
  }

const getPurchasedCourses = async (req, res) => {
    const Id = req.params.courseId
    let course= await Course.findById({Id})
    if(course && course.published) {
      req.user.purchasedCourses.push(course.courseId)
      await User.findByIdAndUpdate({username:(req.user.username)},{...(req.user)})
      res.status(200).send("Purchased course successfully !")
    }
    else{
      res.status(404).send("Course not Found or published")
    }
    }

module.exports = {
    getAllCourses,
    PurchaseCourse,
    getPurchasedCourses,
    Me
}