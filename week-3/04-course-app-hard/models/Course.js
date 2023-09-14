const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: {type: Boolean, default: false},
  })

module.exports= mongoose.model('Course', courseSchema);