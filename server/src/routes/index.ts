import { Router } from 'express';
import user from './middleware/users';
import activos from './middleware/activs';
import review from './middleware/reviews';
import exchange from './middleware/exchangeHistory';
import news from './middleware/news';
import walletRouter from './wallet';
import localAuth from './localAuth';
import googleAuth from './googleAuth';
import mailHandler from './middleware/mailHandler';
import donationsRoutes from './middleware/donation';

const routers: any = Router();

// add exchange history routes

routers.get('/logout', (req: any, res: any, next: any) => {
  req.logout((err: Error) => {
    if (err) {
      return next(err);
    }
    res.send('done');
  });
});

routers.use('/exchange', exchange);
routers.use('/users', user);
routers.use('/activos', activos);
routers.use('/review', review);
routers.use('/wallet', walletRouter);
routers.use('/news', news);
routers.use('/localauth', localAuth);
routers.use('/googleauth', googleAuth);
routers.use('/mail', mailHandler);
routers.use('/donate', donationsRoutes);

export default routers;
