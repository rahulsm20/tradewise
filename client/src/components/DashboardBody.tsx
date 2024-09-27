import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { addUpdateUserDetails, getStockData } from "../api";
import { setStocks, setTickers } from "../store/stocksSlice";
import { StoreRootState } from "../utils/types";
import Expenses from "./dashboard/Expenses";
import Stocks from "./dashboard/Stocks";
import Wallet from "./dashboard/Wallet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../@/components/ui/tabs";

const stockFormSchema = z.object({
  stock: z.string().min(2, {
    message: "Stock name must be 4 characters long",
  }),
});

const DashboardBody = () => {
  const location = useLocation();
  const stockForm = useForm({
    resolver: zodResolver(stockFormSchema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("stocks");
  const stockData = useSelector(
    (state: StoreRootState) => state.stocks.stockData
  );
  const tickers = useSelector((state: StoreRootState) => state.stocks.tickers);
  const data = useSelector((state: StoreRootState) => state.stocks.tickers);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
    setLoading(false);
  }, [location.search]);

  const onSubmit: SubmitHandler<FieldValues> = async ({
    stock,
    walletAddress,
  }) => {
    try {
      setLoading(true);
      await addUpdateUserDetails({ stock, walletAddress });
      const fetched = await getStockData();
      if (fetched) {
        const { stockData, tickers } = fetched;
        dispatch(setStocks(stockData));
        dispatch(setTickers(tickers));
      }
      stockForm.reset();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center">
          <RotateCw className="animate-spin" />
        </div>
      </div>
    );
  }
  const switchTabs = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    navigate(`?tab=${target.innerText.toLowerCase()}`);
  };
  return (
    <div className="flex flex-col gap-5 m-10">
      <Tabs
        defaultValue="stocks"
        className="flex flex-col gap-2"
        value={activeTab}
      >
        <TabsList className="dark:bg-zinc-900 bg-slate-200 flex justify-start">
          <TabsTrigger
            value="stocks"
            onClick={(e) => {
              switchTabs(e);
            }}
          >
            Stocks
          </TabsTrigger>
          <TabsTrigger
            value="web3"
            onClick={(e) => {
              switchTabs(e);
            }}
          >
            Web3
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            onClick={(e) => {
              switchTabs(e);
            }}
          >
            Expenses
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stocks" className="flex flex-col gap-2">
          <Stocks
            tickers={tickers}
            data={stockData}
            loading={loading}
            setLoading={setLoading}
            onSubmit={onSubmit}
          />
        </TabsContent>
        <TabsContent value="web3">
          <Wallet />
        </TabsContent>
        <TabsContent value="expenses">
          <Expenses tickers={tickers} data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardBody;
