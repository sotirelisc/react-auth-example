const passport = require('passport');
const passportService = require('./services/passport');

const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', {
  // No cookie-based session
  session: false
});

const requireSignIn = passport.authenticate('local', {
  session: false
});

module.exports = app => {
  app.post('/signin', requireSignIn, Authentication.signIn);
  app.post('/signup', Authentication.signUp);
};