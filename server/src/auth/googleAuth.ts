export { };
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
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      const dbUserBlocked = await user.findOne({ googleId: profile.id, activos: false })
      if (dbUserBlocked) {
        console.log('User blocked')
        return cb(null, false)
      }

      const dbUser = await user.findOne({ googleId: profile.id });
      if (dbUser) {
        return cb(null, dbUser);
      } else {
        const newUser = await user.create({
          googleId: profile.id,
          username: profile.name.givenName + profile.name.familyName,
          mail: profile.emails[0].value,
          name: profile.name.givenName,
          lastname: profile.name.familyName,
        });
        cb(null, newUser);
      }
    }
  )
);
