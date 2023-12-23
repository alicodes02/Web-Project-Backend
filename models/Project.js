const mongoose = require('mongoose');
const User = require('./User');

const projectSchema = new mongoose.Schema({

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

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
