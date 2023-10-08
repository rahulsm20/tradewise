const pool = require("../db/connect");

const getBalance = async (req, res) => {
  const username = req.query.username;
  try {
    pool.query(
      `SELECT acc_balance FROM users WHERE username=$1`,
      [username],
      (err, result) => {
        res.status(200).json(result ? result.rows : []);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Internal server error" });
  }
};

const addBalance = async (req, res) => {
  const username = req.query.username;
  const balance = req.query.balance;
  try {
    pool.query(
      "INSERT INTO users VALUES ($1,$2)",
      [username, balance],
      (err, result) => {
        res.status(200).json("Balance added");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const updateBalance = async (req, res) => {
  const username = req.query.username;
  const balance = req.query.balance;
  try {
    pool.query(
      "UPDATE users SET acc_balance=($1) where username=($2)",
      [balance, username],
      (err, result) => {
        res.status(200).json("Balance updated");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addBalance, getBalance, updateBalance };
