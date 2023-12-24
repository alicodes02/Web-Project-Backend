const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
