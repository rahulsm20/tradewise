import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserDetails } from "./api";
import { setStocks, setTickers } from "./store/stocksSlice";
import { setWalletData } from "./store/walletSlice";
import { RotateCw } from "lucide-react";
import Landing from "./pages/Landing";

function App() {
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const fetched = await getUserDetails();
      if (fetched) {
        const { stockData, walletData, tickers } = fetched;
        dispatch(setStocks(stockData));
        dispatch(setTickers(tickers));
        dispatch(setWalletData(walletData));
      }
    };
    fetchUser();
    setLoading(false);
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex items-center justify-center m-10">
        <RotateCw />
      </div>
    );
  else if (user) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    );
  } else if (!loading && isLoaded) {
    return (
      <Routes>
        <Route path="*" element={<Landing />} />
      </Routes>
    );
  }
}

export default App;
