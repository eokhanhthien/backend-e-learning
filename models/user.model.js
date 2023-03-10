const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },  
  district: {
    type: String,
    required: true
  },  
  ward: {
    type: String,
    required: true
  },  
  phonenumber: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
  },
  sex: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },


},{
  timestamps: true
});



module.exports = mongoose.model('User', userSchema);

