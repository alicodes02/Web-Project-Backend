const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {

  try {

      const token = req.header('Authorization');

      if (!token) {

          return res.status(401).send({ error: 'Token is not correct' });
      }

      const decoded = jwt.verify(token.replace('Bearer ', ''), 'shhhh');

      const user = await User.findOne({ email: decoded.email });

      if (!user) {

          return res.status(401).send({ error: 'User not authenticated' });
      }

      req.user = user;
      next();

  } catch (error) {
      console.error('Error in authentication:', error);
      res.status(401).send({ error: 'Error during authentication. Check the server logs for details.' });
  }

};

module.exports = authenticateUser;
