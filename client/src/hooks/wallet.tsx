import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { BalanceChartDataType } from "../types";
import { getTransactions } from "../api";
import dayjs from "dayjs";
import { weiToEth } from "../lib/utils";

export const useWallet = () => {
  const { addresses = [], isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: addresses.length > 0 ? addresses[0] : undefined,
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<BalanceChartDataType[]>([]);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const transactions = await getTransactions(addresses[0]);
        const chartData = [
          {
            date: dayjs().format("MMM YYYY"),
            ingress: 0,
            outgress: 0,
          },
        ];
        for (const transaction of transactions) {
          const value = weiToEth(transaction.value, "number");
          const isOutgoing =
            transaction.from.toLowerCase() === addresses[0].toLowerCase();

          if (typeof value === "number") {
            if (isOutgoing) {
              chartData[chartData.length - 1].outgress += value;
            } else {
              chartData[chartData.length - 1].ingress += value;
            }
          } else {
            if (isOutgoing) {
              chartData[chartData.length - 1].outgress += parseFloat(value);
            } else {
              chartData[chartData.length - 1].ingress += parseFloat(value);
            }
          }
        }
        chartData.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
        setChartData(chartData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);
  return {
    addresses,
    isConnected,
    balance,
    loading,
    chartData,
    setLoading,
    setChartData,
  };
};
