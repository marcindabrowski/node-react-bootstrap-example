const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const initDb = require('./initDb');
const localLoginStrategy = require('./passportLocalLogin');
const authRoutes = require('./auth/login');
const claimApi = require('./api/claimApi');
const authCheckMiddleware = require('./middleware/authCheck');

const initServer = (app) => {
  initDb(app);

  app.use(cookieParser());
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));
  // pass the passport middleware
  app.use(passport.initialize());
  passport.use('local-login', localLoginStrategy);

  // login
  app.use('/auth', authRoutes);

  // claim API
  app.use(claimApi.url, claimApi.routes(express.Router(), authCheckMiddleware));
};

module.exports = initServer;
