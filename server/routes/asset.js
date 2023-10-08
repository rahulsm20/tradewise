const express=require('express')
const {addAsset,getAssets,deleteAsset} = require('../controllers/assets')
const router=express.Router()

router.post('/add',addAsset)
router.get('/get',getAssets)
router.delete('/delete',deleteAsset)

module.exports=router