const pool=require('../db/connect')

const getAssets = async(req,res)=>{
    try{
        await pool.query("SELECT * FROM assets",(err,result)=>{
            res.status(200).json(result.rows)
        })
    }
    catch(err){
        console.log(err)
        }
    }

module.exports=getAssets