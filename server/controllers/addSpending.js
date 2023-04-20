const pool = require('../db/connect')
const addSpending= async (req,res)=>{
    const name=req.body.category
    const amount=req.body.amount
    await pool.query("INSERT INTO spending VALUES ($1,$2)",[name,amount],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Spending category added')
        }
    })
    }

module.exports=addSpending