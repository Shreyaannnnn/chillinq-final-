const jwt = require('jsonwebtoken');
require('dotenv').config();


// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization');

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, 'your-secret-key', (err, user) => {
//     if (err) return res.sendStatus(403);

//     req.user = user;
//     next();
//   });
// }

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  console.log('Received token:', token);

  if (!token) {
    console.log('Token not provided. Sending 401.');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  // jwt.verify(token,"your-access-token-secret", (err, user) => {
    if (err) {
      console.log('Token verification failed. Sending 403.');
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}


module.exports = authenticateToken;
