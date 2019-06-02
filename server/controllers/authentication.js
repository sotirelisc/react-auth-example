const User = require('../models/user');

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if user exists
  User.findOne({ email: email })
    .then(existingUser => {
      
    })
    .catch(error => {
      console.log(error);
    })
};