const pool=require('../db/connect')

const updateBalance = async(req,res)=>{
    const username=req.query.username
    const balance = req.query.balance
    try{
        await pool.query("UPDATE users SET acc_balance=($1) where username=($2)",[balance,username],
        (err,result)=>{
            res.status(200).json('Balance updated')
        })
    }
    catch(err){
        console.log(err)
        }
    }

module.exports=updateBalance