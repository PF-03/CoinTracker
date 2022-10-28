import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from "../reducer/index"
import thunk from "redux-thunk";

const composeEnhancers =
   compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)),
);

export default store;