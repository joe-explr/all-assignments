const express = require('express');
const router=express.Router();

const {
  getAllCourses,
  PurchaseCourse,
  getPurchasedCourses,
  Me
} = require('../../controllers/user/course');

  router.route('/course/:courseId').post(PurchaseCourse);
  router.get("/courses",getAllCourses);
  router.get("/purchasedCourses",getPurchasedCourses);
  router.get("/me",Me);

  module.exports= router;