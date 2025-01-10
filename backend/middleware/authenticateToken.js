const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Token after 'Bearer'
  
  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and attach the user object to req.userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach the user ID from the decoded token
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
