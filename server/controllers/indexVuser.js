const axios = require('axios');

// Example function to calculate portfolio performance
// async function calculatePerformance(portfolioData, timePeriod) {
//   // Retrieve NASDAQ historical data for the specified time period
//   const apiKey = 'YOUR_API_KEY'; // Replace with your API key
//   const endDate = new Date().toISOString().slice(0, 10); // Today's date
//   const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10); // Start date based on time period
//   const nasdaqData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IXIC&apikey=${apiKey}&outputsize=compact&datatype=json&startdate=${startDate}&enddate=${endDate}`)
//     .then(response => response.data['Time Series (Daily)'])
//     .catch(error => {
//       console.error(error);
//       return null;
//     });

//   if (!nasdaqData) {
//     return null;
//   }

//   // Calculate NASDAQ percentage change over the time period
//   const nasdaqValues = Object.values(nasdaqData).map(d => parseFloat(d['4. close']));
//   const nasdaqStartValue = nasdaqValues[0]; 
//   const nasdaqEndValue = nasdaqValues[nasdaqValues.length - 1];
//   const nasdaqPercentageChange = ((nasdaqEndValue - nasdaqStartValue) / nasdaqStartValue) * 100;

//   // Calculate user's portfolio percentage change over the time period
//   const portfolioStartValue = portfolioData.startValue;
//   const portfolioEndValue = portfolioData.endValue;
//   const portfolioPercentageChange = ((portfolioEndValue - portfolioStartValue) / portfolioStartValue) * 100;

//   // Return the percentage changes for the user's portfolio and the NASDAQ index
//   console.log(nasdaqPercentageChange());
//   return { portfolioPercentageChange, nasdaqPercentageChange };
// }
const symbol1='MSFT'
const indexVuser= async (req,res) => {
  axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol1}&apikey=${process.env.STOCK_API_KEY}`)
      .then(response => {
        const series = response.data['Time Series (Daily)'];
        const parsedData = Object.keys(series).map(date => ({
          date,
          close: parseFloat(series[date]['4. close']),
        }));
        // setIndexData(parsedData);
        res.status(200).json(parsedData)
      })
      .catch(error => {
        console.error(error);
        res.status(404).json('Error')
      })
      .finally(()=>{
        // setLoading(prevState => [prevState[0], 1])
      });
    }

module.exports=indexVuser
