export {};
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  function (req: any, res: any) {
    console.log(req);
    res.redirect("http://localhost:5173/login/" + req.user.googleId);
    // res.redirect("http://localhost:5173/home");
  }
);

router.get("/getuser", (req: any, res: any) => {
  res.send(req.user);
});

export default router;
