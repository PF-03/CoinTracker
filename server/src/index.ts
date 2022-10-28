require('dotenv').config();
require('./auth/googleAuth');
require('./auth/localAuth');
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import morgan from 'morgan';
import routers from './routes/index';
import { dbConn } from './db';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
const user = require('./models/User');
const app: any = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id: string, done) => {
  user.findById(id, (err: Error, doc: any) => {
    return done(null, doc);
  });
});

// add exchange history routes
app.use('/', routers);

// Error catching endware.
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error);
  const name = error.name;
  const message = error.message;
  // console.error(error);
  return res.send(name + message);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // puerto 3001
  console.log('Server listening on port 3001'); // eslint-disable-line no-console
});

//Conectamos a la base de datos
dbConn();
function _(err: any): void {
  throw new Error('Function not implemented.');
}
