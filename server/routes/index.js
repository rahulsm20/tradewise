const express = require('express')
const router = express.Router()
// const addStock = require('../controllers/addStock')
const indexVuser = require('../controllers/indexVuser')

router.get('/',indexVuser)
// router.post('/add',addStock)


module.exports=router