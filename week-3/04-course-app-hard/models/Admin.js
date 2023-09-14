const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
  })

module.exports= mongoose.model('Admin', AdminSchema);