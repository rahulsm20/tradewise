import express from "express";
import { deleteStock } from "../controllers/stocks";
import {
  addUpdateExpenseData,
  addUpdateUserDetails,
  fetchStockData,
  getExpenseData,
  getTransactions,
} from "../controllers/user";
const router = express.Router();

router.get("/stocks", fetchStockData);
router.delete("/stocks", deleteStock);
router.post("/transactions", getTransactions);
router.post("/expenses", addUpdateExpenseData);
router.get("/expenses", getExpenseData);
router.post("/", addUpdateUserDetails);
export default router;
