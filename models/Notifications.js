const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    notificationId:{
        type:Number,
        required:true,
        unique:true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    //taskId:{
    //    type:Number,
    //    required:true,
    //}

});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
