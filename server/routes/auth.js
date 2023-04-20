const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const getUsers = require("../middleware/getUsers")
const addUser = require('../middleware/addUser')

// // Middleware to get users
router.use(async (req, res, next) => {
    try {
      // Invoke the getUsers function and capture the result (users)
      const users = await getUsers(req, res);
      // Attach the users to the request object for later use
      req.users = users;
      next();
    } catch (err) {
        // Handle any errors thrown by getUsers function
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// SIGNUP
router.post("/signup", [
    check("email", "Please input a valid email")
    .isEmail(),
    check("password", "Please input a password with a min length of 6")
    .isLength({min: 6})
], async (req, res) => {
    const { email, password } = req.body;
    const users = req.users
    
    // Validate the inputs 
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        })
    }

    // Validate if the user doesnt already exist;
    let user = users.find((user) => {
        return user.email === email
    });

    if(user) {
        return res.status(422).json({
            errors: [
                {
                    msg: "This user already exists",
                }
            ]
        })
    }

    // Hash the password
    // Save the password into the db
    try {
        await addUser(req,res,{
            email:email,
            password:password
        });
        const token = await JWT.sign({ email }, import.meta.env.PS_KEY, {expiresIn: 360000});
        res.json({token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // Check if user with email exists
    const users = req.users
    let user = users.find((user) => {
        return user.email === email
    });

    if(!user){
        return res.status(422).json({
            errors: [
                {
                    msg: "Invalid Credentials",
                }
            ]
        })
    }
    // Check if the password if valid
    let isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(404).json({
            errors: [
                {
                    msg: "Invalid Credentials" 
                }
            ]
        })
    }

    // Send JSON WEB TOKEN
    const token = await JWT.sign({email}, import.meta.env.PS_KEY, {expiresIn: 360000})

    res.json({token})
})


module.exports = router