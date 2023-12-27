const express = require('express');
const router = express.Router();
const Notification = require('../models/Notifications');

router.get('/notifications', async (req, res) => {
  try {
    const latestNotifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .limit(3) 
      .select('title description createdAt');

    if (latestNotifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found.' });
    }
    res.json(latestNotifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/delete-notification:id',async(req,res)=>{
    const notificationId = req.params.id;
    try {
      const found = await Notification.findById(notificationId);
      if (!found) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      await Notification.findByIdAndDelete(notificationId);
      const response = {
        message: 'Notification deleted successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting notification' });
    }
});

module.exports = router;
