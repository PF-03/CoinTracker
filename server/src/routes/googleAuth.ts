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
    failureRedirect: `${process.env.FRONT_DEPLOY_URL}/login`,
  }),
  function (req: any, res: any) {
    console.log(req);
    res.redirect(`${process.env.FRONT_DEPLOY_URL}/login/` + req.user.googleId);
    // res.redirect("process.env.FRONT_DEPLOY_URL/home");
  }
);

router.get("/getuser", (req: any, res: any) => {
  res.send(req.user);
});

export default router;
