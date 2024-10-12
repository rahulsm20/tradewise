import { ConnectKitButton } from "connectkit";
import dayjs from "dayjs";
import { ArrowLeftRight, ArrowUpRight, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  Label,
  Legend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  TooltipProps,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useAccount, useBalance } from "wagmi";
import { Button } from "../../@/components/ui/button";
import { Columns } from "../../@/components/ui/columns";
import { DataTable } from "../../@/components/ui/data-table";
import { formatToLocalCurrency, weiToEth } from "../../@/lib/utils";
import { getTransactions } from "../../api";
import { BalanceChartDataType } from "../../types";
import { web3ActionDescriptions } from "../../utils/constants";
import { StoreRootState } from "../../utils/types";
import WalletActionModal from "./WalletActionModal";

// ------------------------------------------------------------
const Wallet = () => {
  // states/hooks
  const { addresses = [], isConnected } = useAccount();
  const [transactions, setTransactions] = useState([]);
  const { data: balance } = useBalance({
    address: addresses.length > 0 ? addresses[0] : undefined,
  });
  const [loading, setLoading] = useState(true);
  const walletData = useSelector((state: StoreRootState) => state.wallet);
  const [chartData, setChartData] = useState<BalanceChartDataType[]>([]);

  type WalletAction = "Buy / Sell" | "Send" | "Swap";

  const walletActions: {
    name: WalletAction;
    action: () => void;
    icon: JSX.Element;
  }[] = [
    {
      name: "Send",
      action: () => {},
      icon: <ArrowUpRight />,
    },
    {
      name: "Swap",
      action: () => {},
      icon: <ArrowLeftRight />,
    },
  ];

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const transactions = await getTransactions(addresses[0]);
        setTransactions(transactions);
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

  if (loading) {
    return (
      <div>
        <RotateCw className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 items-center justify-center">
        <ConnectKitButton
          label="Connect a wallet to get started →"
          customTheme={{
            "--ck-font-family": "Inter",
          }}
        />
        {!loading && isConnected ? (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-4xl">
                {parseFloat(balance?.formatted || "").toFixed(4)} ETH
              </div>
            </div>
            <div className="text-2xl ">
              {formatToLocalCurrency(parseFloat(walletData.info.balanceInUSD))}
            </div>
            <div className="flex gap-3 text-sm">
              {walletActions.map((action) => (
                <WalletActionModal
                  title={action.name}
                  address={addresses[0]}
                  description={web3ActionDescriptions[action.name]}
                  trigger={
                    <div className="flex flex-col gap-1 items-center">
                      <Button
                        key={action.name}
                        onClick={action.action}
                        className="rounded-full"
                      >
                        {action.icon}
                      </Button>
                      {action.name}
                    </div>
                  }
                  okText="Send"
                  cancelText="Cancel"
                  Text="Cancel"
                />
              ))}
            </div>
            {transactions && (
              <DataTable columns={Columns} data={transactions} />
            )}
            {transactions && transactions.length !== 0 && (
              <>
                <p className="text-2xl"> Transaction Summary</p>
                <ResponsiveContainer width={"50%"} height={500}>
                  <BarChart data={chartData} width={400} height={400}>
                    <Bar dataKey="ingress" fill="#6D28D9" />
                    <Bar dataKey="outgress" fill="#82ca9d" />
                    <YAxis
                      label={
                        <Label value="ETH" angle={-90} position="insideLeft" />
                      }
                    />
                    <RechartsTooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "transparent" }}
                    />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="backdrop-blur-xl border p-2 rounded-md max-w-sm z-1">
        <p>{`Date: ${payload?.[0].payload.date}`}</p>
        {payload?.map((entry, index) => {
          return (
            <p key={`tooltip-${index}`}>
              {`${entry.name} : ${entry.value} ETH`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export default Wallet;
