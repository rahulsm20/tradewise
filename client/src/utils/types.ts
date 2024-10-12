import { AssetType, DebtType, ExpenditureType, IncomeType } from "../types";

export type StoreRootState = {
  stocks: {
    stockData: [];
    tickers: [];
  };
  wallet: {
    info: {
      address: string[];
      balance: string;
      balanceInUSD: string;
    };
    transactions: [];
  };
  expenses: {
    expenseData: {
      assets: AssetType[];
      incomes: IncomeType[];
      expenditures: ExpenditureType[];
      debts: DebtType[];
      totalAssetsValue: number;
      totalIncome: number;
      totalExpenditure: number;
    };
  };
};

type StockResult = {
  v: number; // Volume
  vw: number; // Volume weighted average price (VWAP)
  o: number; // Open price
  c: number; // Close price
  h: number; // High price
  l: number; // Low price
  t: number; // Timestamp
  n: number; // Number of trades
};

export type TickerData = {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: StockResult[];
  status: string;
  request_id: string;
  count: number;
};

export type GroupedData = {
  [date: string]: {
    [ticker: string]: {
      c: number;
    };
  };
};

export type ChartData = {
  name: string;
  [key: string]: number | string;
};

export type SymbolData = {
  id: string;
  symbol: string;
  change: string;
  price: string;
  percentageChange: string;
};
