export {};
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const user = require("../models/User");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup"),
  async (req: any, res: any) => {
    const token = await jwt.sign({ user: req.user }, "top_secret");
    return res.json({ token });
  }
);

router.post("/login", passport.authenticate("login"), (req: any, res: any) => {
  req.login(req.user, { session: true }, () => {
    const body = {
      _id: req.user._id,
      username: req.user.username,
      mail: req.user.mail,
      name: req.user.name,
      lasname: req.user.lasname,
      image: req.user.image,
      status: req.user.status,
      token: req.user.token,
    };
    const token = jwt.sign({ user: body }, "top_secret");
    return res.json({ token });
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt"),
  async (req: any, res: any) => {
    const usuario = await user.find({ _id: req.user._id });
    const us = {
      ...req.user,
      type: usuario[0].type,
    };

    res.json({
      user: us,
      token: req.query.secret_token,
    });
  }
);

export default router;
