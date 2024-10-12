export interface Web3Transaction {
  hash: string;
  from: string;
  to: string | null;
  value: bigint;
  blockNumber: bigint;
  gas: bigint;
  gasPrice: bigint;
}

export type StoreRootState = {
  stocks: {
    stockData: [];
  };
  wallet: {
    info: {
      address: string;
      balance: string;
    };
    transactions: [];
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
  symbol: string;
  change: string;
  price: string;
  percentageChange: string;
};
