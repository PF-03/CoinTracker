const passport = require('passport');
const localStrategy = require('passport-local');
const user = require('../models/User');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'mail',
      passwordField: 'password',
    },
    async (mail: any, password: any, done: any) => {
      try {
        const dbUser = await user.findOne({ mail });
        const validate = await user.comparePassword(password, dbUser.password);
        if (dbUser && validate) {
          return done(null, dbUser);
        }
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'mail',
      passwordField: 'password',
    },
    async (mail: any, password: any, done: any) => {
      try {
        const dbUser = await user.findOne({ mail });
        if (!dbUser) {
          return done(null, false, { message: 'user not found' });
        }
        const validate = await user.comparePassword(password, dbUser.password);
        console.log(validate);

        if (!validate) {
          return done(null, false, { message: 'wrong password' });
        }
        return done(null, user, { message: 'successfull' });
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret-token'),
    },
    async (token: any, done: any) => {
      try {
        return done(null, token.user);
      } catch (e) {
        done(e);
      }
    }
  )
);
