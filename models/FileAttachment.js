const mongoose = require('mongoose');

const fileAttachmentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const FileAttachment = mongoose.model('FileAttachment', fileAttachmentSchema);

module.exports = FileAttachment;
