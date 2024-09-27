import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Copy,
  Plus,
  RotateCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import { z } from "zod";
import { addUpdateUserDetails, getUserDetails, getWalletData } from "../../api";
import { formatToLocalCurrency, weiToEth } from "../../@/lib/utils";
import { setWalletData } from "../../store/walletSlice";
import { web3ActionDescriptions } from "../../utils/constants";
import { StoreRootState } from "../../utils/types";
import TWInput from "../TWInput";
import SwapModal from "./SwapModal";
import { Button } from "../../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { DataTable } from "../../@/components/ui/data-table";
import { Columns } from "../../@/components/ui/columns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../@/components/ui/tooltip";
import { ConnectKitButton } from "connectkit";

// ------------------------------------------------------------

type BalanceChartDataType = {
  date: string;
  outgress: number;
  ingress: number;
};

// ------------------------------------------------------------
const Wallet = () => {
  // states/hooks
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [tooltipContent, setTooltipContent] =
    useState<string>("Copy to Clipboard");
  const walletData = useSelector((state: StoreRootState) => state.wallet);
  const [chartData, setChartData] = useState<BalanceChartDataType[]>([]);

  // form
  const walletFormSchema = z.object({
    walletAddress: z.string().min(42, {
      message: "Wallet address must be 42 characters long",
    }),
  });
  const walletForm = useForm({
    resolver: zodResolver(walletFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ walletAddress }) => {
    setLoading(true);
    try {
      await addUpdateUserDetails({ walletAddress });
      const fetched = await getUserDetails();
      if (fetched) {
        const { walletData } = fetched;
        dispatch(setWalletData(walletData));
      }
      walletForm.reset();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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
        const { walletData = [] } = await getWalletData();
        dispatch(setWalletData(walletData));
        const transactions = [...walletData.transactions];
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
            transaction.from.toLowerCase() ===
            walletData.info.address[0].toLowerCase();

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
      {!loading && walletData.info.address ? (
        <div className="flex flex-col gap-5 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {walletData.info.address[0].slice(0, 10)}...
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {" "}
                {walletData.info.address[0].slice(0, 10)}...
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <blockquote className="flex gap-2 text-xs items-start">
                <code className="dark:bg-zinc-800 p-2 rounded-md">
                  {walletData.info.address[0].slice(0, 10)}...
                </code>
                <TooltipProvider>
                  <Tooltip>
                    <CopyToClipboard
                      text={walletData.info.address[0]}
                      onCopy={() => {
                        setTooltipContent("Copied!");
                        setTimeout(() => {
                          setTooltipContent("Copy to Clipboard");
                        }, 5000);
                      }}
                    >
                      <TooltipTrigger>
                        <Button className="h-6 w-6 p-1 bg-zinc-900 hover:bg-zinc-700">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                    </CopyToClipboard>
                    <TooltipContent>
                      <p>{tooltipContent}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </blockquote>
            </div>
            <div className="text-4xl">
              {parseFloat(walletData.info.balance || "0").toFixed(4)} ETH
            </div>
          </div>
          <div className="text-2xl ">
            {formatToLocalCurrency(parseFloat(walletData.info.balanceInUSD))}
          </div>
          <div className="flex gap-3 text-sm">
            {walletActions.map((action) => (
              <SwapModal
                title={action.name}
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
                cancel
                Text="Cancel"
              />
            ))}
          </div>
          <ConnectKitButton />
          <DataTable columns={Columns} data={walletData.transactions} />
          <p className="text-2xl"> Transaction Summary</p>
          {chartData.length !== 0 && (
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
          )}
        </div>
      ) : (
        <Form {...walletForm}>
          <form onSubmit={walletForm.handleSubmit(onSubmit)}>
            <FormField
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TWInput
                      disabled={loading}
                      placeholder="Enter your wallet address"
                      icon={<Plus />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
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
