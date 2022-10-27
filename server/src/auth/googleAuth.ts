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
      user.findOne({ googleId: profile.id }, async (err: Error, doc: any) => {
        if (err) {
          return cb(err, null);
        }

        if (!doc) {
          const newUser = new user({
            googleId: profile.id,
            username: profile.name.givenName,
            mail: `${profile.name.givenName}@gmail.com`,
          });
          await newUser.save();
          cb(null, newUser);
        }
        cb(null, doc);
      });
    }
  )
);
