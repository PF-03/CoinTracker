import userModel from './User';
import walletModel from './Wallet';
import reviewModel from './Review';
import exchangeHistoryModel from './ExchangeHistory';
import reminderModel from './Reminder';
import newstModel from './new';

const models: Object = {
  user: userModel,
  wallet: walletModel,
  review: reviewModel,
  exchangeHistory: exchangeHistoryModel,
  reminder: reminderModel,
  new: newstModel,
};

export default models;
