const passport = require('passport');
const localStrategy = require('passport-local');
const user = require('../models/User');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.serializeUser((user: any, done: any) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  const dbUser = await user.findById({ _id: id });
  done(null, dbUser);
});

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req: any, mail: any, password: any, done: any) => {
      try {
        const { username, name, lastname } = req.body;
        const newUser = await user.create({
          username,
          mail: mail,
          password: await user.encryptPassword(password),
          name,
          lastname,
        });
        return done(null, newUser);
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
      usernameField: 'email',
      passwordField: 'password',
    },
    async (mail: any, password: any, done: any) => {
      try {
        const dbUser = await user.findOne({ mail });
        if (!dbUser) {
          return done(null, false, { message: 'user not found' });
        }
        const validate = await user.comparePassword(password, dbUser.password);

        if (!validate) {
          return done(null, false, { message: 'wrong password' });
        }
        return done(null, dbUser, { message: 'successfull' });
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
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
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
