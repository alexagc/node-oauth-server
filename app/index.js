const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

const config = require('../config');

require('./authentication').init(app);

app.use(session({
  store: new RedisStore({
    host: config.redisStore.url,
    port: config.redisStore.port
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send(`
    <form action="/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>`);
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/error'
  }));

app.get('/success', passport.authenticationMiddleware(), (req, res) => {
  console.log(req.session);
  res.status(200).send('loggin in');
});

module.exports = app;
