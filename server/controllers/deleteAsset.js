const pool = require('../db/connect')
const deleteAsset= async (req,res)=>{
    const name=req.body.name
    await pool.query("DELETE FROM assets where asset_name = ($1)",[name],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Income source deleted')
        }
    })
    }

module.exports=deleteAsset