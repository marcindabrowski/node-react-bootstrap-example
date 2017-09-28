const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  // res.redirect('/');
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }

    const userEmail = decoded.sub;

    if (userEmail !== config.defaultUserEmail) {
      return res.status(401).end();
    }

    return next();
  });
};
