const express = require('express')
const app = express();
const cors = require('cors')
const { json } = require('express')
const stockRoutes=require('./routes/stocks')
const index = require('./routes/index');
const getNews = require('./controllers/getNews');
const income = require('./routes/income')
const spending=require('./routes/spending')
const asset = require('./routes/asset')
const balance = require('./routes/balance')
const debt = require('./routes/debt')
const auth = require('./routes/auth')
require('dotenv').config();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => res.json("tradewise API"));
app.use('/stocks',stockRoutes)
app.use('/index',index)
app.use('/income',income)
app.use('/spending',spending)
app.use('/assets',asset)
app.use('/balance',balance)
app.use('/debt',debt)
app.use('/news',getNews)
app.use('/auth',auth)
app.listen(3000, () => console.log("Listening on port 3000"));
