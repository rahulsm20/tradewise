const pool=require('../db/connect')

const getUsers = async(req,res)=>{
    try{
        const result = await pool.query(`SELECT * FROM users`);
        const rows = result.rows;
        return rows;
    }
    catch(err){
        console.log(err)
        res.status(404).json({error:'Internal server error'})
        }
    }

module.exports=getUsers