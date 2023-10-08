import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import budgetSlice from './budgetSlice'
import stocksSlice from './stocksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    budgetData:budgetSlice,
    stockData:stocksSlice
  },
});

export default store;