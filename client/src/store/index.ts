import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stocksSlice";
import walletReducer from "./walletSlice";

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    wallet: walletReducer,
  },
});

export default store;
