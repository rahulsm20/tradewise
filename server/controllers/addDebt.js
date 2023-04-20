const pool = require('../db/connect')
const addDebt= async (req,res)=>{
    const name=req.body.debtCategory
    const amount=req.body.amount
    await pool.query("INSERT INTO debt VALUES ($1,$2)",[name,amount],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Debt category added')
        }
    })
    }

module.exports=addDebt