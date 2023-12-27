const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    proposedTime: {
        type: String, // Adjust type as necessary (String or Date)
        required: true,
      },
      meetingDetails: {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
 // attendees: [{
   // type: mongoose.Schema.Types.ObjectId,
    //ref: 'User' // Assuming a User model for attendees
 // }//],
  // You might consider adding more fields like location, duration, etc.

});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
