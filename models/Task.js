const mongoose = require('mongoose');
const Comment = require('./Comment');
const FileAttachment = require('./FileAttachment'); 
const User = require('./User');

const taskSchema = new mongoose.Schema({

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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    fileAttachments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FileAttachment',
        },
    ],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
