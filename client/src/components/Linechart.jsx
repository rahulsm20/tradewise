import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart,LineChart, Area,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import loadGIF from '../assets/loading-gif.gif'

const StockChart = ({symbol1,symbol2,symbol3}) => {
  const [indexData, setIndexData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [additionalData,setAdditionalData]=useState([]);
  const [cachedData, setCachedData] = useState(() => {
    const cachedDataStr = localStorage.getItem('cachedData');
      return cachedDataStr ? JSON.parse(cachedDataStr): [];
  });
  const [loading,setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol1}&apikey=${import.meta.env.STOCK_API_KEY}`),
          axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol2}&apikey=${import.meta.env.STOCK_API_KEY_2}`),
          axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol3}&apikey=${import.meta.env.STOCK_API_KEY_3}`),
        ]);
  
        const series1 = response1.data['Time Series (Daily)'];
        const parsedData1 = Object.keys(series1).map(date => ({
          date,
          close: parseFloat(series1[date]['4. close']),
        }));
        setIndexData(parsedData1);
  
        const series2 = response2.data['Time Series (Daily)'];
        const parsedData2 = Object.keys(series2).map(date => ({
          date,
          close: parseFloat(series2[date]['4. close']),
        }));
        setUserData(parsedData2);
  
        const series3 = response3.data['Time Series (Daily)'];
        const parsedData3 = Object.keys(series3).map(date => ({
          date,
          close: parseFloat(series3[date]['4. close']),
        }));
        setAdditionalData(parsedData3);
  
        setLoading([1, 1, 1]);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [symbol1, symbol2, symbol3]);
  
  const stock1Name = 'MSFT';
  const stock2Name = 'NFLX';
  const stock3Name = 'META';
  
  useEffect(() => {
    const length = Math.min(indexData.length, userData.length, additionalData.length);
    const combinedData = indexData.slice(0, length).reverse().map((stock1Datum, index) => ({
      date: stock1Datum.date,
      [stock1Name]: stock1Datum.close,
      [stock2Name]: userData[index].close,
      [stock3Name]: additionalData[index].close,
    }));
  
    localStorage.setItem('cachedData', JSON.stringify(combinedData));
  
    setCachedData(combinedData);
  }, [indexData, userData, additionalData]);
  
  
  
  // const chartData = cachedData.length > 0 ? cachedData : [];
  
  return (
    <div>
    {
      loading[0] || loading[1] ? 
      <div>
        <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={cachedData} title={symbol1 + ' v '+ symbol2 + 'v' + symbol3}>
          <XAxis dataKey="date" />
          <YAxis />
          <Area type="monotone" dataKey={stock2Name} stroke="#F37335" />
          <Area type="monotone" dataKey={stock1Name} stroke="#FF0000" />
          <Area type="monotone" dataKey={stock3Name} stroke="#89CFF0" />
          <Tooltip />
          <Legend />
        </AreaChart>
        </ResponsiveContainer>
      </div> : <img src={loadGIF}/> 
      }
      </div>
  );
}

export default StockChart;
