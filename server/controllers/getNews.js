const axios=require('axios')
const getNews = async (req,res) => {
    const date= new Date()
    const today = date
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${req.query.changedQuery}&from=${today}&to=${today}&sortBy=relevancy&apiKey=1a08f12386644b42a8491942ddaa22de`
      );
      console.log(req.query.changedQuery)
      res.status(200).json(response.data.articles);
    } catch (err) {
      res.status(400).json(err.message)
    }
  };

module.exports=getNews