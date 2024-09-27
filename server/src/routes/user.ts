import express from "express";
import {
  addUpdateUserDetails,
  fetchStockData,
  fetchUserDetails,
  fetchWalletData,
} from "../controllers/user";
import { deleteStock } from "../controllers/stocks";
const router = express.Router();

router.get("/stocks", fetchStockData);
router.delete("/stocks", deleteStock);
router.get("/wallet", fetchWalletData);
router.post("/", addUpdateUserDetails);
export default router;
