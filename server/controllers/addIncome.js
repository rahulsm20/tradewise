const pool = require('../db/connect')
const addIncome= async (req,res)=>{
    const name=req.body.name
    const amount=req.body.amount
    await pool.query("INSERT INTO income_source VALUES ($1,$2)",[name,amount],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Income source added')
        }
    })
    }

module.exports=addIncome