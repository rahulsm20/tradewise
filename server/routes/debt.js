const express = require("express");
const { addDebt, getDebt, deleteDebt } = require("../controllers/debt");
const router = express.Router();

router.post("/add", addDebt);
router.get("/get", getDebt);
router.delete("/delete", deleteDebt);

module.exports = router;
