const pool = require('../db/connect')
const addStock= async (req,res)=>{
    const symbol=req.body.symbol
    await pool.query("INSERT INTO stocks VALUES ($1)",[symbol],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Song added')
        }
    })
    }

module.exports=addStock