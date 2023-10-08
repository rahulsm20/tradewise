const pool = require("../db/connect");

const addAsset = async (req, res) => {
  const name = req.body.asset;
  const amount = req.body.amount;
  await pool.query(
    "INSERT INTO assets VALUES ($1,$2)",
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

const deleteAsset = async (req, res) => {
  const name = req.body.name;
  await pool.query(
    "DELETE FROM assets where asset_name = ($1)",
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

const getAssets = async (req, res) => {
  try {
    await pool.query("SELECT * FROM assets", (err, result) => {
      res.status(200).json(result ? result.rows : []);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {addAsset, deleteAsset, getAssets};
