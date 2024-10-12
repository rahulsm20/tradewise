import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stocksSlice";
import walletReducer from "./walletSlice";
import expensesReducer from "./expensesSlice";

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    wallet: walletReducer,
    expenses: expensesReducer,
  },
});

export default store;
