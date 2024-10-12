export type NewsArticleType = {
  author: string;
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  description: string;
};

export type UserDetailsType = {
  stock?: string;
  walletAddress?: string;
};

export type TransactionType = {
  from: string;
  to: string;
  timestamp: number;
  value: string;
  hash: string;
  gas?: string;
  gasPrice?: string;
};

export type BalanceChartDataType = {
  date: string;
  outgress: number;
  ingress: number;
};

export type AssetType = {
  id?: string;
  value: number;
  name: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ExpenditureType = {
  id?: string;
  value: number;
  name: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
};

export type IncomeType = {
  id?: string;
  value: number;
  source: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DebtType = {
  id?: string;
  name: string;
  amount: number;
  startDate: string;
  interestRate: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ExpenseData = {
  assets: AssetType[];
  totalAssetsValue: number;
  totalIncome: number;
  totalExpenditure: number;
  expenditures: ExpenditureType[];
  incomes: IncomeType[];
  debts: DebtType[];
};
