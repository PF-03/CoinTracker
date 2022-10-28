export {};
const express = require('express');
const passport = require('passport');
const user = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req: any, res: any) => {
  try {
    const newUser = await user.create({
      ...req.body,
      password: await user.encryptPassword(req.body.password),
    });

    res.json({
      message: 'Signup succesful',
      user: newUser,
    });
  } catch (e: any) {
    res.json({ message: e.message });
  }
});

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req: any, res: any) => {
    res.json({
      message: 'Signup succesful',
      user: req.user,
    });
  }
);

router.post('/login', async (req: any, res: any, next: any) => {
  passport.authenticate('login', async (err: any, user: any, _info: any) => {
    try {
      if (err || !user) {
        const error = new Error('Error');
        return next(error);
      }
      req.login(user, { session: false }, async (err: any) => {
        if (err) return next(err);
        const body = { _id: user._id, email: user.email };
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
  passport.authenticate('jwt', { session: false }),
  (req: any, res: any) => {
    res.json({
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

export default router;
