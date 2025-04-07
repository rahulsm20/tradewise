import dayjs from "dayjs";
import "dotenv/config";
import { BlockTag, EtherscanProvider, Networkish } from "ethers"; //^v6
import { createClient } from "redis";
import Web3 from "web3";
import { GroupedData, TickerData } from "./types";
export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis:", error.toString());
});

export const cacheData = async (key: string, data: string) => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    const cached = await redisClient.set(key, data);
    return cached;
  } catch (err) {
    console.log(err);
  }
};

export const getCachedData = async (key: string) => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    const cached = await redisClient.get(key);
    return cached;
  } catch (err) {
    console.log(err);
  }
};

process.on("SIGINT", async () => {
  if (redisClient.isOpen) {
    console.log("<< disconnecting from Redis");
    await redisClient.disconnect();
  }
  process.exit();
});

export const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.INFURA_URL as string)
);

export function stringifyBigInt(obj: any): any {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(stringifyBigInt);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, stringifyBigInt(value)])
    );
  } else {
    return obj;
  }
}

export const weiToEth = (wei: bigint): string => {
  const ether = wei / BigInt(1e18);
  const remainder = wei % BigInt(1e18);
  const decimal = remainder.toString().padStart(18, "0");

  return `${ether}.${decimal.slice(0, 6)}`;
};

export const generateCacheKey = (identifier: string, type: string) => {
  return `${identifier}:${dayjs().format("YYYY-MM-DD")}: ${type}`;
};

export const convertMultipleStockData = (stockData: TickerData[]) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  const groupedData: GroupedData = {};

  stockData.forEach((tickerData: TickerData) => {
    tickerData.results.forEach((item) => {
      const date = formatDate(item.t);
      if (!groupedData[date]) {
        groupedData[date] = {};
      }
      groupedData[date][tickerData.ticker] = {
        c: item.c,
      };
    });
  });

  const finalData = Object.entries(groupedData).map(([date, tickersData]) => {
    const entry: { name: string; [key: string]: number | string } = {
      name: date,
    };
    for (const [ticker, values] of Object.entries(tickersData)) {
      entry[ticker] = values.c;
    }
    return entry;
  });
  return finalData;
};

export default class CustomEtherscanProvider extends EtherscanProvider {
  constructor(networkish: Networkish, apiKey?: string) {
    super(networkish, apiKey);
  }

  async getHistory(
    address: string,
    startBlock?: BlockTag,
    endBlock?: BlockTag
  ): Promise<Array<any>> {
    const params = {
      action: "txlist",
      address,
      startblock: startBlock == null ? 0 : startBlock,
      endblock: endBlock == null ? 99999999 : endBlock,
      sort: "desc",
    };

    const normalTxParams = {
      ...params,
      action: "txlist",
    };

    const internalTxParams = {
      ...params,
      action: "txlistinternal",
    };

    // Fetch both normal and internal transactions
    const [normalTransactions, internalTransactions] = await Promise.all([
      this.fetch("account", normalTxParams),
      this.fetch("account", internalTxParams),
    ]);

    // Combine both sets of transactions
    const allTransactions = [...normalTransactions, ...internalTransactions];

    // Sort and limit to the latest 24 transactions
    const latestTransactions = allTransactions
      .sort((a, b) => b.blockNumber - a.blockNumber) // Sort by block number (most recent first)
      .slice(0, 25); // Limit to the latest 24 transactions

    return latestTransactions;
  }
}
