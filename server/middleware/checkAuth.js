const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET

const checkAuth = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const type = req.header("verify")
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret);
      req.user = decoded;
      if(type){
        next();
      }
      else{
        res.status(200).json(decoded)
      }
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = checkAuth;