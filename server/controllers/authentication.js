const jwt = require('jwt-simple');
const User = require('../models/user');

// Generate JWT for user
const tokenForUser = user => {
  const timestamp = new Date().getTime();

  return jwt.encode({ 
    sub: user.id,
    // Issed at Time
    iat: timestamp
  }, process.env.JWT_SECRET);
};

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({
      error: 'You must provide email & password.'
    });
  }

  // Check if user exists
  User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Email is in use');
      }

      // Create new user
      const user = new User({
        email: email,
        password: password,
      });

      user.save()
        .then(user => res.send({
          _id: user._id,
          email: user.email,
          token: tokenForUser(user)
        }));
    })
    .catch(error => {
      // Error handling
      if (error.message === 'Email is in use') {
        return res.status(422).send({ error: error.message });
      }
      return next(error);
    });
};