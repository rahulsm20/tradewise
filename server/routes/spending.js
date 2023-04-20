const express = require('express')
const router = express.Router()
const addSpending = require('../controllers/addSpending')
const getSpending = require('../controllers/getSpending')
const deleteSpending = require('../controllers/deleteSpending')

router.post('/add',addSpending)
router.get('/get',getSpending)
router.delete('/delete',deleteSpending)

module.exports=router