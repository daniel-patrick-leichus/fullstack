const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { sequelize, Sequelize } = require('../services/sequelize');
const keys = require('../config/keys');

const User = require('../models/SqlUser')(sequelize, Sequelize);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.find({where: {id: id}}).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.find({where: { googleId: profile.id }}).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          User.create({ googleId: profile.id })
            .then(newUser => done(null, newUser));
        }
      });
    }
  )
);
