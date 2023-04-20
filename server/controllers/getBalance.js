const pool=require('../db/connect')

const getBalance = async(req,res)=>{
    const username=req.query.username
    try{
         await pool.query(`SELECT acc_balance FROM users WHERE username=$1`,[username],
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