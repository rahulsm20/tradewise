import dayjs from "dayjs";
import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { polygon } from "../polygon";
import {
  cacheData,
  convertMultipleStockData,
  getCachedData,
  stringifyBigInt,
  web3,
  weiToEth,
} from "../utils";
import { TickerData, Web3Transaction } from "../utils/types";
import { etherscanProvider } from "../utils/providers";
import { ethers, isAddress } from "ethers";
import { searchStocks } from "./stocks";
import axios from "axios";
import {
  addUpdateAsset,
  addUpdateDebt,
  addUpdateExpenditure,
  addUpdateIncome,
} from "../lib/expenses";

export const addUpdateUserDetails = async (req: Request, res: Response) => {
  try {
    const { stock, walletAddress } = req.body.userDetails;
    let updateDetails = {};
    if (stock) {
      const isValidStock = await polygon.reference
        .tickers(stock)
        .then((res: any) => {
          return res.results.length > 0;
        })
        .catch(() => false);
      if (!isValidStock) {
        throw new Error("Invalid Stock");
      }
      updateDetails = {
        ...updateDetails,
        stocks: {
          create: {
            symbol: stock,
          },
        },
      };
    }
    if (walletAddress) {
      updateDetails = {
        ...updateDetails,
        wallet: {
          create: {
            address: walletAddress,
          },
        },
      };
    }
    if (Object.keys(updateDetails).length === 0) {
      return res.status(400).json({ message: "No details to update" });
    }
    const user = await prisma.user.update({
      where: { clerkId: req.auth.userId },
      data: updateDetails,
      include: {
        stocks: true,
      },
    });
    return res
      .status(200)
      .json({ message: "User details updated successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.auth.userId },
      include: {
        stocks: true,
      },
    });
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};

export const fetchUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.auth.userId;
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        stocks: true,
        assets: true,
      },
    });
    if (user) {
      return res.json({
        user,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchStockData = async (req: Request, res: Response) => {
  const { search } = req.query;
  if (search != undefined) {
    return await searchStocks(req, res);
  }
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: req.auth.userId },
      include: {
        stocks: true,
      },
    });
    const startDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
    const endDate = dayjs().format("YYYY-MM-DD");
    if (user) {
      const stocks = await prisma.stock.findMany({
        where: { userId: user.id },
      });

      let stockData = await Promise.all(
        stocks.map(async (stock) => {
          const cached = await getCachedData(
            `${stock.symbol}:${startDate}:${endDate}`
          );
          if (cached) {
            return JSON.parse(cached);
          }
          const data = await polygon.stocks
            .aggregates(stock.symbol, 1, "day", startDate, endDate, {
              limit: 100,
            })
            .then(async (data: any) => {
              await cacheData(
                `${stock.symbol}:${startDate}:${endDate}`,
                JSON.stringify(data)
              );
              return data;
            })
            .catch((e: any) => {
              console.error("An error happened:", e);
              throw new Error(e);
            });
          return data;
        })
      );

      const data = convertMultipleStockData(stockData);

      const tickers = stockData.map((stock: TickerData, idx) => ({
        id: stocks[idx].id,
        symbol: stock.ticker,
        price: stock.results[stock.results.length - 1].c.toFixed(2) as string,
        change: (
          stock.results[stock.results.length - 1].c - stock.results[0].c
        ).toFixed(2) as string,
        percentageChange: (
          ((stock.results[stock.results.length - 1].c - stock.results[0].c) /
            stock.results[0].c) *
          100
        ).toFixed(2),
      }));
      return res.status(200).json({
        stockData: data,
        tickers,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const fetchWalletData = async (req: Request, res: Response) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { clerkId: req.auth.userId },
//       include: {
//         stocks: true,
//       },
//     });
//     const endDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
//     if (user) {
//       let transactions: any[] = [];
//       let balance: bigint | null = null;
//       let balanceInUSD: number | null = null;
//       let userAddress =
//         (user.wallet && user.wallet.length > 0 && user.wallet?.[0].address) ||
//         "";

//       if (userAddress !== "") {
//         if (!isAddress(userAddress)) {
//           return res.status(400).json({ error: "Invalid Ethereum address." });
//         }
//         const cacheKey = `${userAddress}:${dayjs().format(
//           "YYYY-MM-DD"
//         )}:transactions`;
//         const cachedData = await getCachedData(cacheKey);

//         if (cachedData) {
//           transactions = JSON.parse(cachedData);
//         } else {
//           transactions = await etherscanProvider.getHistory(userAddress);
//           const transactionsForCache = stringifyBigInt(transactions);
//           await cacheData(cacheKey, JSON.stringify(transactionsForCache));
//         }
//         balance = await web3.eth.getBalance(user.wallet?.[0].address as string);

//         balanceInUSD = await polygon.crypto
//           .dailyOpenClose("ETH", "USD", endDate)
//           .then(({ close }: { close: number }) => {
//             return close * (balance ? Number(weiToEth(balance)) : 0);
//           });

//         let walletData = {
//           info: {
//             address: [userAddress],
//             balance: balance != undefined ? weiToEth(balance).toString() : "",
//             balanceInUSD: balanceInUSD ? balanceInUSD : 0,
//           },
//           transactions: transactions.map((tx) => {
//             return {
//               hash: tx.hash as string,
//               from: tx.from as string,
//               to: tx.to as string,
//               timestamp: tx.timeStamp as number,
//               value: tx.value,
//               blockNumber: tx.blockNumber.toString(),
//               gas: tx.gas.toString(),
//               gasPrice: tx?.gasPrice ? tx?.gasPrice.toString() : "",
//             };
//           }),
//         };
//         return res.status(200).json({
//           walletData,
//         });
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getBalanceInUSD = async (req: Request, res: Response) => {
//   try {
//     const { balance } = req.body;

//     const user = await prisma.user.findUnique({
//       where: { clerkId: req.auth.userId },
//       include: {
//         wallet: true,
//       },
//     });
//     if (user) {
//       const cacheKey = `${dayjs().format("YYYY-MM-DD")}:ethToUSD`;
//       const cachedData = await getCachedData(cacheKey);
//       let ethToUSD = 0;
//       if (cachedData) {
//         ethToUSD = JSON.parse(cachedData);
//         const balanceInUSD =
//           ethToUSD * (balance ? Number(weiToEth(balance)) : 0);
//         return res.status(200).json({
//           balanceInUSD,
//         });
//       } else {
//         const ethToUSD = await polygon.crypto.dailyOpenClose(
//           "ETH",
//           "USD",
//           dayjs().subtract(1, "day").format("YYYY-MM-DD")
//         );
//         await cacheData(cacheKey, ethToUSD.close);
//         const balanceInUSD =
//           ethToUSD.close * (balance ? Number(weiToEth(balance)) : 0);
//         return res.status(200).json({
//           balanceInUSD,
//         });
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const getTransactions = async (req: Request, res: Response) => {
  const { address } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: req.auth.userId },
    });
    if (user) {
      if (address !== "") {
        if (!isAddress(address)) {
          return res.status(400).json({ error: "Invalid Ethereum address." });
        }
        const cacheKey = `${address}:${dayjs().format(
          "YYYY-MM-DD"
        )}:transactions`;
        const cachedData = await getCachedData(cacheKey);

        let transactions: Web3Transaction[] = [];
        if (cachedData) {
          transactions = JSON.parse(cachedData);
        } else {
          transactions = await etherscanProvider.getHistory(address);
          const transactionsForCache = stringifyBigInt(transactions);
          await cacheData(cacheKey, JSON.stringify(transactionsForCache));
        }
        return res.status(200).json(transactions);
      } else {
        throw new Error("User not found");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const infuraProxy = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(process.env.INFURA_URL || "", req.body);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addUpdateExpenseData = async (req: Request, res: Response) => {
  try {
    const { income, expenditure, debt, asset } = req.body;
    const user = await prisma.user.findUnique({
      where: { clerkId: req.auth.userId },
    });
    if (user) {
      if (expenditure) {
        try {
          await addUpdateExpenditure({ expenditure, req, res });
        } catch (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Internal Server Error", err });
        }
      }

      if (asset) {
        try {
          await addUpdateAsset({ asset, req, res });
        } catch (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Failed to update/create debt", err });
        }
      }

      if (debt) {
        try {
          await addUpdateDebt({ debt, req, res });
        } catch (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Failed to update/create asset", err });
        }
      }

      if (income) {
        try {
          await addUpdateIncome({ income, req, res });
        } catch (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Failed to update/create asset", err });
        }
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};

export const getExpenseData = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: req.auth.userId },
      include: {
        assets: true,
        debts: true,
        expenditures: true,
        incomes: true,
      },
    });
    if (user) {
      return res.status(200).json({
        user,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};
