const pool=require('../db/connect')

const addBalance = async(req,res)=>{
    const username=req.query.username
    const balance = req.query.balance
    try{
        await pool.query("INSERT INTO users VALUES ($1,$2)",[username,balance],
        (err,result)=>{
            res.status(200).json('Balance added')
        })
    }
    catch(err){
        console.log(err)
        }
    }

module.exports=addBalance