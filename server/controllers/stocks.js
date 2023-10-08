const pool = require("../db/connect");

const addStock = async (req, res) => {
  const symbols = req.body.symbols;
  const user_id = req.params.user_id;
  pool.query(
    "INSERT INTO stocks VALUES ($1,$2)",
    [user_id, symbols],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json("Stock added");
      }
    }
  );
};

const getStocks = async (req, res) => {
  var rows = [];
  const user_id = req.params.user_id;
  pool.query(
    "SELECT symbol FROM stocks WHERE user_id = ($1)",
    [user_id],
    (err, result) => {
      if (err) {
        res.status(404).json(err);
      } else {
        rows = result.rows;
        res.status(200).json(rows);
      }
    }
  );
};

module.exports = { addStock, getStocks };