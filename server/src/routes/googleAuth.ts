export { };
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
    failureMessage: true
  }),
  function (req: any, res: any) {
    console.log(req);
    // if (req.user.activos === false) {
    //   res.redirect(`${process.env.FRONT_DEPLOY_URL}/login/${req.user.activos}`)
    // } else {
      res.redirect(`${process.env.FRONT_DEPLOY_URL}/login/${req.user._id}/${req.user.googleId}/${req.user.username}/${req.user.mail}/${req.user.name}/${req.user.lastname}/${req.user.type[0]}/${req.user.image}/${req.user.activos}/${req.user.status}`);
    
    // res.redirect("process.env.FRONT_DEPLOY_URL/home");
  }
);

router.get("/getuser", (req: any, res: any) => {
  res.send(req.user);
});

export default router;
