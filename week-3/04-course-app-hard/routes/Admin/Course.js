const express = require('express');
const router=express.Router();

const {
    CreateCourse,
    UpdateCourse,
    queryCourse,
    getAll,
    Me
  } = require('../../controllers/admin/course');

  router.route('/course').post(CreateCourse);
  router.route('/course/:courseId').put(UpdateCourse).get(queryCourse);
  router.get("/courses",getAll);
  router.get("/me",Me);

  module.exports= router;