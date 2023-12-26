const express = require('express');
const router = express.Router();
const { getDb } = require('./db');

// GET route for retrieving user data
router.get('/user', async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection('USER_info');

    const userId = req.query.userId;

    const userData = await collection.findOne({ userId: userId });

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route for updating user data
router.post('/api/user/update', async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection('USER_info');

    const { userId, fullName, email, phone, website, street, city, state, zipcode } = req.body;

    const existingUser = await collection.findOne({ userId: userId });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await collection.updateOne(
      { userId: userId },
      {
        $set: {
          fullName: fullName || existingUser.fullName,
          email: email || existingUser.email,
          phone: phone || existingUser.phone,
          website: website || existingUser.website,
          street: street || existingUser.street,
          city: city || existingUser.city,
          state: state || existingUser.state,
          zipcode: zipcode || existingUser.zipcode
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'User data updated successfully' });
    } else {
      res.status(200).json({ message: 'No changes were made' });
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
