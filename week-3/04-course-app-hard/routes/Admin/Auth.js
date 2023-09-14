const express = require('express');
const router=express.Router();

const {Signup, login} = require('../../controllers/admin/auth');

  router.route('/signup').post(Signup);
  router.route('/login').post(login);
 
  module.exports= router;