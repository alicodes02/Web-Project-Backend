const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  //userId:{
    //    type:Number,
    //    required:true,
    //    unique:true,
    //}
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true
  },

  profilePicture: {

    type: String,
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
