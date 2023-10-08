const router = require("express").Router();
const getUsers = require("../middleware/getUsers");
const {login,signup} = require("../controllers/auth")
const checkAuth = require("../middleware/checkAuth")
router.use(async (req, res, next) => {
  try {
    const users = await getUsers(req, res);
    req.users = users;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup",signup);

router.post("/login",login);

router.post('/check',checkAuth)

module.exports = router;
