const express = require('express')
const getBalance = require('../controllers/getBalance')
const updateBalance = require('../controllers/updateBalance')
const addBalance = require('../controllers/addBalance')
const router = express.Router()

router.get('/get',getBalance)
router.post('/add',addBalance)
router.patch('/update',updateBalance)

module.exports = router