const express = require('express');
const passport = require('passport');

const router = express.Router({});

const User = require('db/models/user');

router.post('/register', (req, res) => {
  console.log('request: ', req.body);
  const local = passport.authenticate('local');
  const cb = (err) => {
    if (err) {
      res.send({ message: err.message, success: false });
    } else {
      local(req, res, () => res.json({
        message: `User ${ req.body.username } was successfully registered`,
        success: true
      }));
    }
  };
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    cb,
  );
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { res.send({ message: err.message, success: false }); }
    if (info) {
      res.send({ message: info.message, success: false });
    }
    if (user) {
      res.send({ message: `User ${ user.username } successfully authorized`, success: true });
    }
  })(req, res, next);
});

router.get('/logout', (err, req, res) => {
  if (err) {
    res.send({ message: err.message, success: false });
  } else {
    req.logout();
    res.send({ message: 'User logged out', success: true });
  }
});

module.exports = router;
