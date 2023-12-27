const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/events', async (req, res) => {
    try {
      const count = await Event.findOne().sort({ eventId: -1 }).exec();
      const newEventId = count ? count.eventId + 1 : 1;
      const { title, date, priority } = req.body;
      const event = new Event({
        eventId: newEventId,
        title,
        date,
        priority,
      });
      const savedEvent = await event.save();
      res.json(savedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/allevents', (req, res) => {
    const { year, month } = req.query;
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.event_date);
      return eventDate.getFullYear() === parseInt(year) && eventDate.getMonth() === parseInt(month) - 1;
    });
  
    res.json(filteredEvents);
  });
  
  module.exports =router;