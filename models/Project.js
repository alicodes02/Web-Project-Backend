const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  //projectId:{
    //    type:Number,
    //    required:true,
    //    unique:true,
    //}
  projectName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  projectCategory: {
    type: String
    // You might consider adding validation or enum for specific categories
  },
  dueDate: {
    type: Date,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  assignTo: {
    type: String
    // You might want to link this to User schema if assigning to specific users
  },
  visibility: {
    type: String,
   
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
