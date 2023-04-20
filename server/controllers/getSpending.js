const pool=require('../db/connect')

const getSpending = async(req,res)=>{
    try{
        await pool.query("SELECT * FROM spending",(err,result)=>{
            res.status(200).json(result.rows)
        })
    }
    catch(err){
        console.log(err)
        }
    }

module.exports=getSpending