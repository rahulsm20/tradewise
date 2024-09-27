import { ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "../../utils/types";
import ConfirmationModal from "../ConfirmationModal";
import { deleteStock, getStockData } from "../../api";
import { setStocks, setTickers } from "../../store/stocksSlice";
import { Badge } from "../../@/components/ui/badge";
import { Button } from "../../@/components/ui/button";

type tickerCardProps = {
  stocksLoading: boolean;
  setStocksLoading: (loading: boolean) => void;
};

const TickerCards = ({ stocksLoading, setStocksLoading }: tickerCardProps) => {
  const tickers = useSelector((state: StoreRootState) => state.stocks.tickers);
  const dispatch = useDispatch();
  const deleteStockHandler = async (stockId: string) => {
    try {
      setStocksLoading(true);
      await deleteStock(stockId);
      const fetched = await getStockData();
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

  return (
    <>
      {tickers.map(({ symbol: stock, change, percentageChange, price, id }) => {
        const isPositive = parseFloat(change) > 0;
        return (
          <Badge className="flex gap-1 bg-slate-100 hover:bg-slate-100 dark:bg-zinc-900  p-2 text-current rounded-lg hover:-translate-y-1 transition-transform duration-500">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <p>{stock}</p>
                  <p>{price} USD</p>
                </div>
                <ConfirmationModal
                  trigger={
                    <Button className="bg-transparent hover:bg-transparent h-4 w-4 p-0 text-current">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  }
                  title="Are you sure you want to delete this stock?"
                  loading={stocksLoading}
                  description="This action cannot be undone. This will permanently delete this stock from your portfolio."
                  onOk={() => deleteStockHandler(id)}
                />
              </div>
              <p
                className={`flex flex-wrap gap-1 ${
                  isPositive ? "text-green-400" : "text-red-500"
                }`}
              >
                <span>{`${isPositive ? `+${change}` : change}`}</span>
                <span>({percentageChange}%)</span>
                {isPositive ? (
                  <span className="text-green-500">
                    <ChevronUp className="w-4 h-4" fill="#4ADE80" />
                  </span>
                ) : (
                  <span className="text-red-500">
                    <ChevronDown className="w-4 h-4" fill="#EF4444" />
                  </span>
                )}
                <span> past month </span>
              </p>
            </div>
          </Badge>
        );
      })}
    </>
  );
};

export default TickerCards;
