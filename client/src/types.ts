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
