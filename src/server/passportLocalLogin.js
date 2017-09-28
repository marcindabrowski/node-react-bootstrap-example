const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  if (config.defaultUserEmail !== userData.email || config.defaultPassword !== password) {
    const error = new Error('Incorrect email or password');
    error.name = 'IncorrectCredentialsError';

    return done(error);
  }

  const payload = {
    sub: config.defaultUserEmail,
  };

  // create a token string
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
  const data = {
    name: config.defaultUserEmail,
  };

  return done(null, token, data);
});
