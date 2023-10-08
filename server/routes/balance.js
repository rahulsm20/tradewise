const express = require('express')
const {getBalance,updateBalance,addBalance} = require("../controllers/balance")
const router = express.Router()

router.get('/get',getBalance)
router.post('/add',addBalance)
router.patch('/update',updateBalance)

module.exports = router