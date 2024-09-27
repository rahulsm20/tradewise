import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TickerData } from "../utils/types";

type ResultType = {
  c: number;
  t: number;
};
type Stock = {
  ticker: string;
  results: ResultType[];
};

export interface StockState {
  stockData: Stock[];
  tickers: TickerData[];
}

const initialState: StockState = {
  stockData: [],
  tickers: [],
};

const stockSlice = createSlice({
  name: "stockData",
  initialState,
  reducers: {
    setStocks: (state, action: PayloadAction<Stock[]>) => {
      state.stockData = action.payload;
    },
    setTickers: (state, action: PayloadAction<TickerData[]>) => {
      state.tickers = action.payload;
    },
  },
});

export const { setStocks, setTickers } = stockSlice.actions;
export default stockSlice.reducer;
