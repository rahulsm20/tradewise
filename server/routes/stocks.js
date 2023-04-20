const express = require('express')
const router = express.Router()
const addStock = require('../controllers/addStock')
const getStocks = require('../controllers/getStocks')

router.get('/',getStocks)
router.post('/add',addStock)


module.exports=router