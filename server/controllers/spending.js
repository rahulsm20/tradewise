const pool = require("../db/connect");
const addSpending = async (req, res) => {
  const name = req.body.category;
  const amount = req.body.amount;
  await pool.query(
    "INSERT INTO spending VALUES ($1,$2)",
    [name, amount],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(202).json("Spending category added");
      }
    }
  );
};

const getSpending = async (req, res) => {
  try {
    pool.query("SELECT * FROM spending", (err, result) => {
      res.status(200).json(result ? result.rows : []);
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteSpending = async (req, res) => {
  const name = req.body.category;
  pool.query(
    "DELETE FROM spending where category = ($1)",
    [name],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(202).json("Spending category deleted");
      }
    }
  );
};

module.exports = { addSpending, getSpending, deleteSpending };
