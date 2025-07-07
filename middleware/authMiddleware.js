const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT payload:', decoded);
    // ✅ Ensure userId is present
    if (!decoded.user || !decoded.user.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = { userId: decoded.user.userId }; // ✅ must have userId
    next();
  } catch (err) {
    console.error('Token error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
