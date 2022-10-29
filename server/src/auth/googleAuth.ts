export {};
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const user = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/googleauth/google/callback',
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log(profile);
      user.findOne({ googleId: profile.id }, async (err: Error, doc: any) => {
        if (err) {
          return cb(err, null);
        }

        if (!doc) {
          const newUser = new user({
            googleId: profile.id,
            username: profile.name.givenName + profile.name.familyName,
            mail: profile.emails[0].value,
            name: profile.name.givenName,
            lastname: profile.name.familyName,
          });
          await newUser.save();
          cb(null, newUser);
        }
        cb(null, doc);
      });
    }
  )
);
