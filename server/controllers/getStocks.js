const pool = require('../db/connect')
let rows=''
const getStocks= async (req,res)=>{
    pool.query("SELECT * FROM stocks",(err,result)=>{
        if(err)
        {
            console.log(err)
            return;
        }
        else{
              rows = (result.rows)
        }
    })
    res.json(rows)
    }

module.exports=getStocks