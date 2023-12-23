const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String, 
        required: true
    },

    description: {
        type: String, 
        required: true
    },

    dueDate: {
        type: Date, 
        required: true
    },

    priority: {
        type: String, 
        required: true
    },

    assignee: {

        type: String,
        required: true,
    },

    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
