const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    const oldUser = req.user;
    req.logout();

    const message = oldUser ? `${oldUser} logged out` : 'no one to log out';
    res.send(message);
  });

  app.get('/api/current_user', (req, res) => {
    const message = req.user ? `${req.user} is logged in` : 'no current user';
    res.send(message);
  });
};
