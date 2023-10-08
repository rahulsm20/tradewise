import React,{useState,useEffect} from "react";
import axios from 'axios'
const Card = (props) => {
  const [dailyChange, setDailyChange] = useState(0);
  const data = JSON.parse(localStorage.getItem(`stockData_${props.symbol}`))
  useEffect(() => {
    if(data){
      const series = data[`Time Series (Daily)`];
      const dates = Object.keys(series);
      const latestClose = parseFloat(series[dates[0]]['4. close']);
      const prevClose = parseFloat(series[dates[1]]['4. close']);
      const change = ((latestClose - prevClose) / prevClose) * 100;
      setDailyChange(change)
    }
    else{
      axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props.symbol}&apikey=${import.meta.env.STOCK_API_KEY}`)
      .then(response => {
        const series = response.data[`Time Series (Daily)`];
        const dates = Object.keys(series);
        const latestClose = parseFloat(series[dates[0]]['4. close']);
        const prevClose = parseFloat(series[dates[1]]['4. close']);
        const change = ((latestClose - prevClose) / prevClose) * 100;
        setDailyChange(change);
        localStorage.setItem(`stockData_${props.symbol}`, JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);
  
  return (
    <div className="card hover:bg-indigo-900 shadow-3xl lg:mx-10 bg-indigo-950">
      <div className="card-body flex flex-row place-content-center place-items-center">
        <h2 className="card-title">{props.symbol}</h2>
        {dailyChange<0 ? 
        <div className="flex gap-4">
        <p className="text-red-700">
          {dailyChange ? dailyChange.toFixed(2) : localStorage.getItem('stockData')}%
        </p>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Eo_circle_red_arrow-down.svg/2048px-Eo_circle_red_arrow-down.svg.png' className="indicator"/> 
        <span className="text-red-700"> today</span>
        </div>
        : 
        <div className="flex justify-center items-center gap-2">
          <span className="text-green-500">
          {dailyChange ? dailyChange.toFixed(2) : localStorage.getItem('stockData')}%
        </span>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png' className="indicator"/>
        <span className="text-green-500 font-bold"> today</span>
        </div>
        }
        <div className="card-actions justify-end">
        </div>
      </div>
    </div>
  );
};

export default Card;
