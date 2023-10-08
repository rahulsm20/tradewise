const express = require('express')
const router = express.Router()
const {addStock,getStocks}= require("../controllers/stocks")

router.get('/:user_id',getStocks)
router.post('/:user_id',addStock)


module.exports=router