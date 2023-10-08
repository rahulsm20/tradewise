const express = require('express')
const router = express.Router()
const {addIncome,getIncome,deleteIncome} = require("../controllers/income")

router.post('/add',addIncome)
router.get('/get',getIncome)
router.delete('/delete',deleteIncome)

module.exports=router