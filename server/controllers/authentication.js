const User = require('../models/user');

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
        .then(user => res.send(user));
    })
    .catch(error => {
      // Error handling
      if (error.message === 'Email is in use') {
        return res.status(422).send({ error: error.message });
      }
      return next(error);
    });
};