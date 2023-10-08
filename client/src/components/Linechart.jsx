import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ symbols }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  var symbolsArr = [];
  symbols.forEach((symbol) => {
    symbolsArr.push(symbol.symbol);
  });

  useEffect(() => {
    const fetchDataFromLocalStorage = async () => {
      const fetchedData = await Promise.all(
        symbols.map(async (symbol) => {
          const stock = symbol.symbol;
          const savedData = localStorage.getItem(`stockData_${stock}`);
          return {
            stock,
            data: savedData ? JSON.parse(savedData) : [],
          };
        })
      );
      const stockData = fetchedData.map((response) => {
        const series = response.data["Time Series (Daily)"];
        const parsedData = Object.keys(series).map((date) => ({
          date,
          stock: response.stock,
          value: parseFloat(series[date]["4. close"]),
        }));
        return parsedData;
      });

      const combinedData = [];

      // Iterate over each array
      stockData.forEach((arr) => {
        arr.forEach((currentObj) => {
          // Find an existing object in the combinedData array with the same date
          const existingObj = combinedData.find(
            (obj) => obj.date === currentObj.date
          );
          if (existingObj) {
            existingObj[currentObj.stock] = currentObj.value;
          } else {
            currentObj[currentObj.stock] = currentObj.value;
            delete currentObj.stock;
            delete currentObj.value;
            combinedData.push(currentObj);
          }
        });
      });

      setData(combinedData);
    };

    fetchDataFromLocalStorage();
    setLoading(false); // Set loading to false once the data is ready
  }, []); // Empty dependency array to run this effect only once

  return loading ? (
    <img src="/loading.svg" alt="Loading" />
  ) : (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart data={data} width={500} height={500}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey={symbolsArr[0]} stroke="#FF0000" />
          <Area type="monotone" dataKey={symbolsArr[1]} stroke="#89CFF0" />
          <Area type="monotone" dataKey={symbolsArr[2]} stroke="#F37335" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
