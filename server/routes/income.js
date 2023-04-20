const express = require('express')
const router = express.Router()
const addIncome = require('../controllers/addIncome')
const getIncome = require('../controllers/getIncome')
const deleteIncome = require('../controllers/deleteIncome')

router.post('/add',addIncome)
router.get('/get',getIncome)
router.delete('/delete',deleteIncome)

module.exports=router