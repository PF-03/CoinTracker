export {};
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
  '/signup',
  passport.authenticate('signup'),
  (req: any, res: any) => {
    res.send(req.user);
  }
);

router.post('/login', passport.authenticate('login'), (req: any, res: any) => {
  req.login(req.user, { session: true }, () => {
    const body = {
      _id: req.user._id,
      email: req.user.mail,
      name: req.user.name,
    };
    const token = jwt.sign({ user: body }, 'top_secret');
    return res.json({ token });
  });
});

router.get('/profile', passport.authenticate('jwt'), (req: any, res: any) => {
  res.json({
    user: req.user,
    token: req.query.secret_token,
  });
});

export default router;
