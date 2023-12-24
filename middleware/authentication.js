const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) 
{

    const token = req.header('Authorization');

  if (!token) 
  {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }


  jwt.verify(token, 'shhhh', (err, decoded) => 
  {
    if (err) 
    {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId; // Assuming userId is stored in the token
    next();

  });

  
}

module.exports = authenticateToken;
