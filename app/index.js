const express = require('express');
const passport = require('passport');

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();

const config = require('../config');

require('./authentication').init(app);

app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
