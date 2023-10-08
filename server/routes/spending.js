const express = require('express')
const router = express.Router()
const {addSpending ,getSpending,deleteSpending} = require("../controllers/spending")

router.post('/add',addSpending)
router.get('/get',getSpending)
router.delete('/delete',deleteSpending)

module.exports=router