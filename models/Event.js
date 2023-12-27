const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventId:{
        type:Number,
        required:true,
        unique:true
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    theme: {
        type: String,
        enum: ['blue','red','yellow', 'green','purple'],
        required: true,
    },
    //taskId:{
    //    type:Number,
    //    required:true,
    //}

});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
