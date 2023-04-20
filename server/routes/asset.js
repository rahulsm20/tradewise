const express=require('express')
const addAsset = require('../controllers/addAsset')
const getAsset= require('../controllers/getAssets')
const deleteAsset= require('../controllers/deleteAsset')
const router=express.Router()

router.post('/add',addAsset)
router.get('/get',getAsset)
router.delete('/delete',deleteAsset)

module.exports=router