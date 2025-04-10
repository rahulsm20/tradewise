import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { apiService } from "../../api";
import { setStocks, setTickers } from "../../store/stocksSlice";
import { chartColors } from "../../utils/constants";
import { ChartData, SymbolData } from "../../utils/types";
import Loading, { LoadingEllipsis } from "../Loading";
import { TWCombobox } from "../TWCombobox";
import TickerCards from "./ticker-card";

type StockProps = {
  onSubmit: SubmitHandler<FieldValues>;
  tickers: SymbolData[] | undefined;
  data: ChartData[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

//-----------------------------------------
const Stocks = ({ tickers, data = [], loading = true }: StockProps) => {
  // Form
  const stockFormSchema = z.object({
    stock: z.string().min(2, {
      message: "Stock name must be 4 characters long",
    }),
  });

  //-----------------------------------------

  const submitStock: SubmitHandler<FieldValues> = async ({ stock }) => {
    try {
      setStocksLoading(true);
      await apiService.addUpdateUserDetails({ stock });
      const fetched = await apiService.getStockData();
      if (fetched) {
        const { stockData, tickers } = fetched;
        dispatch(setStocks(stockData));
        dispatch(setTickers(tickers));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setStocksLoading(false);
    }
  };

  //-----------------------------------------

  const dispatch = useDispatch();
  const [stocksLoading, setStocksLoading] = useState(false);

  const [stockOptions, setStockOptions] = useState([]);

  const stockForm = useForm({
    resolver: zodResolver(stockFormSchema),
    mode: "onBlur",
  });

  const [stockQuery, setStockQuery] = useState<string>("");
  const stockOption = stockForm.watch("stock");

  useEffect(() => {
    const fetchStockOptions = async () => {
      const query = stockQuery ? stockQuery : "a";
      const stockData = await apiService.searchStock(query);
      const options = stockData.map(
        ({ ticker, name }: { ticker: string; name: string }) => ({
          label: `${name} (${ticker})`,
          value: ticker,
        })
      );
      setStockOptions(options);
    };
    fetchStockOptions();
  }, [stockQuery]);

  useEffect(() => {
    if (stockOption) {
      submitStock({ stock: stockOption });
    }
  }, [stockOption]);

  useEffect(() => {
    const fetchData = async () => {
      const { stockData = [], tickers = [] } = await apiService.getStockData();
      dispatch(setStocks(stockData));
      dispatch(setTickers(tickers));
    };
    fetchData();
  }, []);

  if (loading || !tickers || stocksLoading) {
    return <LoadingEllipsis />;
  }

  return (
    <>
      {!loading && !(tickers.length >= 4) && (
        <Form {...stockForm}>
          <form onSubmit={stockForm.handleSubmit(submitStock)}>
            <FormField
              disabled={loading || stocksLoading}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TWCombobox
                      disabled={loading || stocksLoading}
                      placeholder={
                        loading || stocksLoading ? "Processing" : "Add a stock"
                      }
                      onSearchChange={(value) => setStockQuery(value)}
                      options={stockOptions}
                      icon={<Plus />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Add a stock to your portfolio to get started (Upto 4)
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
      <div className="flex gap-2 overflow-scroll md:overflow-visible md:justify-center mt-5">
        <TickerCards
          stocksLoading={stocksLoading}
          setStocksLoading={setStocksLoading}
        />
      </div>
      {loading || stocksLoading ? (
        <Loading />
      ) : (
        <section className="flex items-center justify-center w-full">
          <ResponsiveContainer width={"100%"} height={400}>
            <AreaChart
              width={400}
              height={400}
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {tickers.map(({ symbol: stock }, idx: number) => {
                const color = chartColors[idx % chartColors.length];
                return (
                  <Area
                    type="monotone"
                    stackId={idx}
                    dataKey={stock}
                    stroke={color}
                    key={stock}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </section>
      )}
    </>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: string;
  payload?: {
    name: string;
    value: string;
    stroke: string;
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label flex flex-col gap-1 text-sm border p-2 bg-white dark:bg-black rounded-lg">
          {payload.map((item) => (
            <>
              <span className="font-normal">{`${item.name} - ${item.value} USD`}</span>
            </>
          ))}
          <span className="font-light dark:text-slate-300">{`${dayjs(
            label
          ).format("ddd, MMMM DD")}`}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default Stocks;
