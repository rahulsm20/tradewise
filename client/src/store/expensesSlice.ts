import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseData } from "../types";

type ExpenseDataState = {
  expenseData: ExpenseData;
};

const initialState: ExpenseDataState = {
  expenseData: {
    assets: [],
    incomes: [],
    expenditures: [],
    debts: [],
    totalAssetsValue: 0,
    totalIncome: 0,
    totalExpenditure: 0,
  },
};

const expenseSlice = createSlice({
  name: "expenseData",
  initialState,
  reducers: {
    setExpenseData: (state, action: PayloadAction<ExpenseData>) => {
      state.expenseData = action.payload;
    },
  },
});

export const { setExpenseData } = expenseSlice.actions;
export default expenseSlice.reducer;
