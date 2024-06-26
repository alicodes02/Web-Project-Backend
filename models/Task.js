const mongoose = require('mongoose');
const Comment = require('./Comment');
const FileAttachment = require('./FileAttachment'); 
const User = require('./User');

const taskSchema = new mongoose.Schema({
    //TaskId:{
    //    type:Number,
    //    required:true,
    //    unique:true,
    //}
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
    comments: [
        {
            text: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ],
    
    fileAttachments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FileAttachment',
        },
    ],

    progress: {

        type: Number,
        default:0
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
