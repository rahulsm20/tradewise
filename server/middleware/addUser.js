const pool = require('../db/connect')
const bcrypt = require('bcrypt');
const addUser= async (req,res)=>{
    try{
        const username = req.body.username
        const email=req.body.email
        const password=req.body.password
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (email,password,username) values ($1,$2,$3)",[email,hashedPassword,username])
        console.log('Added new user')
        return 'User added'
    }
    catch(err){
        console.log(err)
        throw err;
    }
    }

module.exports=addUser