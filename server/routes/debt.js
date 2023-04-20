const express=require('express')
const addDebt = require('../controllers/addDebt')
const getDebt= require('../controllers/getDebt')
const deleteDebt= require('../controllers/deleteDebt')
const router=express.Router()

router.post('/add',addDebt)
router.get('/get',getDebt)
router.delete('/delete',deleteDebt)

module.exports=router