const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    req.team = decoded.team;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
