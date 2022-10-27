import userModel from "./User";
import walletModel from "./Wallet"
import reviewModel from "./Review"
import exchangeHistoryModel from "./ExchangeHistory"

const models: Object = {
    user: userModel,
    wallet: walletModel,
    review: reviewModel,
    exchangeHistory: exchangeHistoryModel,
}

export default models