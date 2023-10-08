const pool = require("../db/connect");

const addDebt = async (req, res) => {
  const name = req.body.debtCategory;
  const amount = req.body.amount;
  pool.query(
    "INSERT INTO debt VALUES ($1,$2)",
    [name, amount],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(202).json("Debt category added");
      }
    }
  );
};

const getDebt = async (req, res) => {
  try {
    pool.query(`SELECT * FROM debt`, (err, result) => {
      res.status(200).json(result ? result.rows : []);
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Internal server error" });
  }
};

const deleteDebt = async (req, res) => {
  const name = req.body.debtCategory;
  pool.query(
    "DELETE FROM debt where category = ($1)",
    [name],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(202).json("Debt category deleted");
      }
    }
  );
};

module.exports = { getDebt, addDebt, deleteDebt };
