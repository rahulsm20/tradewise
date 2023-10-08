const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const getUsers = require("../middleware/getUsers");
const addUser = require("../middleware/addUser");

const login = async (req, res) => {
  const { email, password } = req.body;
  // Check if user with email exists
  const users = req.users;
  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(422).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }
const username = user.username;
const user_id = user.id;
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  // Send JSON WEB TOKEN
  const token = JWT.sign({ username,email,user_id }, process.env.JWT_SECRET, {
    expiresIn: 360000,
  });

  res.json({ token });
};

const signup = () => {
  [
    check("email", "Please input a valid email").isEmail(),
    check(
      "password",
      "Please input a password with a min length of 6"
    ).isLength({
      min: 6,
    }),
    check("username", "Please enter a valid username").isLength({ min: 6 }),
  ];
  async (req, res) => {
    const { email, password, username } = req.body;
    const users = req.users;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    let user = users.find((user) => {
      return user.email === email || user.username === username;
    });

    if (user) {
      return res.status(422).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    }

    try {
      await addUser(req, res, {
        email: email,
        password: password,
      });
      const token = await JWT.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: 360000,
      });
      res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = { login, signup };
