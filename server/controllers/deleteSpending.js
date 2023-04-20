const pool = require('../db/connect')
const deleteSpending= async (req,res)=>{
    const name=req.body.category
    await pool.query("DELETE FROM spending where category = ($1)",[name],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Spending category deleted')
        }
    })
    }

module.exports=deleteSpending