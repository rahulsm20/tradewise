const pool = require('../db/connect')
const deleteDebt= async (req,res)=>{
    const name=req.body.debtCategory
    await pool.query("DELETE FROM debt where category = ($1)",[name],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Debt category deleted')
        }
    })
    }

module.exports=deleteDebt