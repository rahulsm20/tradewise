import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: null,
  assets: [],
  income: [],
  expenditure: [],
  debt: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    addAsset: (state, action) => {
      state.assets = [...state, action.payload];
    },
    addIncome: (state, action) => {
      state.income = [...state, action.payload];
    },
    addExpenditure: (state, action) => {
      state.expenditure = [...state, action.payload];
    },
    addDebt: (state, action) => {
      state.debt = [...state, action.payload];
    },
  },
});

export const { setBalance, addDebt,addAsset,addIncome,addExpenditure } = budgetSlice.actions;
export default budgetSlice.reducer;
