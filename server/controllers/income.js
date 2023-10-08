const pool = require("../db/connect");
const addIncome = (req, res) => {
  const name = req.body.name;
  const amount = req.body.amount;
  pool.query(
    "INSERT INTO income_source VALUES ($1,$2)",
    [name, amount],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(202).json("Income source added");
      }
    }
  );
};

const getIncome = (req, res) => {
  try {
    pool.query("SELECT * FROM income_source", (err, result) => {
      res.status(200).json(result ? result.rows : []);
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteIncome = (req, res) => {
  const name = req.body.name;
  pool.query(
    "DELETE FROM income_source where category = ($1)",
    [name],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(202).json("Income source deleted");
      }
    }
  );
};

module.exports = { addIncome, getIncome, deleteIncome };
