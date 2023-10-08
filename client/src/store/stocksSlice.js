import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    symbols:[],
};

const stockSlice = createSlice({
  name: "stockData",
  initialState,
  reducers: {
    addStock: (state, action) => {
      state.stocks = [...state,action.payload];
    },
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
    // addIncome: (state, action) => {
    //   state.income = [...state, action.payload];
    // },
    // addExpenditure: (state, action) => {
    //   state.expenditure = [...state, action.payload];
    // },
    // addDebt: (state, action) => {
    //   state.debt = [...state, action.payload];
    // },
  },
});

export const { addStock,setStocks } = stockSlice.actions;
export default stockSlice.reducer;
