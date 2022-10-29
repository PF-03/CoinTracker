export {};
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    return next();
  }
  res.redirect('http://localhost:5173/register');
};

router.post(
  '/signup',
  passport.authenticate('signup', {
    successRedirect: 'http://localhost:5173',
    failureRedirect: 'http://localhost:5173/register',
    passReqToCallback: true,
  })
);

router.post('/login', async (req: any, res: any, next: any) => {
  passport.authenticate('login', async (err: any, user: any, _info: any) => {
    console.log(user);
    try {
      if (err || !user) {
        const error = new Error('Error');
        return next(error);
      }
      req.login(user, { session: true }, async (err: any) => {
        if (err) return next(err);
        const body = { _id: user._id, email: user.mail };
        const token = jwt.sign({ user: body }, 'top_secret');
        return res.json({ token });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
});

router.get(
  '/profile',
  isAuthenticated,
  passport.authenticate('jwt', { session: true }),
  (req: any, res: any) => {
    res.json({
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

router.get('/logout', (req: any, res: any, next: any) => {
  req.logout((err: Error) => {
    if (err) {
      return next(err);
    }
    res.send('done');
  });
});

export default router;
