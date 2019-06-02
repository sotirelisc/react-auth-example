const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const LocalStrategy = require('passport-local');

const User = require('../models/user');

const localOptions = {
  // Use email for auth
  usernameField: 'email'
};
// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify username & password
  User.findOne({ email: email}, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    // Compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  })
});

// Setup options for JWT Strategy
const jwtOptions = {
  // Get JWT token from 'authorization' header
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // Check if user ID in payload exists in DB
  User.findById(payload.sub, (err, user) => {
    // Generic error handling
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);