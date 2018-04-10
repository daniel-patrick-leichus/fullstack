const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const keys = require('./config/keys');
const MongoStore = require('connect-mongo')(session);
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 2 * 24 * 60 * 60
    }),
    secret: keys.sessionSecret,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/viewCounter', function(req, res, next) {
  req.session.views = (req.session.views || 0) + 1;
  res.setHeader('Content-Type', 'text/html')
  res.write('<p>views: ' + req.session.views + '</p>')
  res.end()
})


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 11905;
app.listen(PORT);
