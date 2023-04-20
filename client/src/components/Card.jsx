import React,{useState,useEffect} from "react";
import axios from 'axios'
const Card = (props) => {
  const [dailyChange, setDailyChange] = useState(0);
  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${props.symbol}&apikey=${import.meta.env.STOCK_API_KEY_4}`
      )
      .then(response => {
        const series = response.data[`Time Series (Daily)`];
        const dates = Object.keys(series);
        const latestClose = parseFloat(series[dates[0]]['4. close']);
        const prevClose = parseFloat(series[dates[1]]['4. close']);
        const change = ((latestClose - prevClose) / prevClose) * 100;
        setDailyChange(change);
        localStorage.setItem('stockData',change.toFixed(2))
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.symbol]);
  
  return (
    <div className="card bg-blue-950 shadow-3xl ">
      <div className="card-body flex flex-row place-content-center place-items-center">
        <h2 className="card-title">{props.symbol}</h2>
        <div>{dailyChange ? dailyChange.toFixed(2) : localStorage.getItem('stockData')}%
        </div>
        {dailyChange<0 ? 
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Eo_circle_red_arrow-down.svg/2048px-Eo_circle_red_arrow-down.svg.png' className="indicator"/> 
        : <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png' className="indicator"/>}
        <div className="card-actions justify-end">
        </div>
      </div>
    </div>
  );
};

export default Card;
