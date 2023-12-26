const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Meeting = require('../models/Meeting')

const authenticateToken = require('../middleware/authentication'); 

// Define middleware or routes for authentication if needed
// Endpoint to create a new meeting
router.post('/meeting', async (req, res) => {
    const { proposedTime, meetingDetails } = req.body;
    const { title, description } = meetingDetails;
    console.log(req.body);

    try {
        if (!proposedTime || !title || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newMeeting = new Meeting({
            proposedTime,
            meetingDetails: {
                title,
                description,
            },
        });

        await newMeeting.save();

        res.status(200).json({ message: 'New meeting added successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message }); // Provide detailed error message
    }
});




// Endpoint to fetch all meetings
router.get('/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to fetch a specific meeting by ID
router.get('/meetings/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to update a meeting by ID
router.patch('/update-meeting/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const meeting = await Meeting.findByIdAndUpdate(id, updates, { new: true });
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to delete a meeting by ID
router.delete('/delete-meeting/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(id);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json({ message: 'Meeting deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
