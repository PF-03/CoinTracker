export {};
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
  }),
  function (req: any, res: any) {
    res.redirect('http://localhost:5173');
  }
);

router.get('/getuser', (req: any, res: any) => {
  res.send(req.user);
});

router.get('/logout', (req: any, res: any, next: any) => {
  req.logout((err: Error) => {
    if (err) {
      return next(err);
    }
    res.send('done');
  });
});

export default router;
