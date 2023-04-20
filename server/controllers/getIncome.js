const pool=require('../db/connect')

const getIncome = async(req,res)=>{
    try{
        await pool.query("SELECT * FROM income_source",(err,result)=>{
            res.status(200).json(result.rows)
        })
    }
    catch(err){
        console.log(err)
        }
    }

module.exports=getIncome