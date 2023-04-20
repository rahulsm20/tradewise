const pool = require('../db/connect')
const deleteIncome= async (req,res)=>{
    const name=req.body.name
    await pool.query("DELETE FROM income_source where name = ($1)",[name],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Income source deleted')
        }
    })
    }

module.exports=deleteIncome