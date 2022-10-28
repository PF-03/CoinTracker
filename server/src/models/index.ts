import userModel from "./User";
import walletModel from "./Wallet"
import reviewModel from "./Review"
import exchangeHistoryModel from "./ExchangeHistory"
import newstModel from "./new";

const models: Object = {
    user: userModel,
    wallet: walletModel,
    review: reviewModel,
    exchangeHistory: exchangeHistoryModel,
    new:newstModel
}

export default models