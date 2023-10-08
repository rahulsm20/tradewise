import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../api/index.js";
import Card from "./Card";
import InsertStock from "./InsertStock";
import LineChart from "./Linechart";
import { Link } from "react-router-dom";

const DashboardBody = () => {
  const [stocks, setStock] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user.user_id);
  useEffect(() => {
    setLoading(true);
    fetchStocks(user)
      .then((res) => setStock(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    isAuthenticated ? 
    <div className="flex flex-col p-5 gap-5 m-5">
      <h2 className="text-3xl sm:text-2xl">Your stocks</h2>
      <div className="gap-4 grid sm:flex-col md:grid-cols-2 lg:grid-cols-3">
        {loading && stocks.length > 0 ? (
          <progress className="progress w-56"></progress>
        ) : (
          stocks.map((stock, id) => {
            return <Card symbol={stock.symbol} key={id} />;
          })
        )}
        {stocks.length >= 3  ? <></> : <InsertStock />}
      </div>
      <div className="my-12 lg:p-10">
        {!loading && isAuthenticated ?  <LineChart symbols={stocks}/> :<> </>}
      </div>
    </div>
    :
    <div className="m-20">
      <Link to="/login">
      Please login to access dashboard
      </Link>
    </div>
  );
};

export default DashboardBody;
