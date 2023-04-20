const pool=require('../db/connect')

const getBalance = async(req,res)=>{
    try{
         await pool.query(`SELECT * FROM debt`,
        (err,result)=>{
            res.status(200).json(result.rows)
        })
    }
    catch(err){
        console.log(err)
        res.status(404).json({error:'Internal server error'})
        }
    }

module.exports=getBalance