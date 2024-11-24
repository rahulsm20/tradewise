import express from "express";
import getNews from "../controllers/getNews";
import userRoutes from "./user";
import { getTokenPrice, swapController } from "../controllers/swap";
const router = express.Router();

router.get("/", (_, res) =>
  res.json({ status: "ok", message: "tradewise API" })
);
router.get("/news", getNews);
router.post("/swap", swapController);
router.post("/quote", getTokenPrice);
router.get("/tokenPrice", (req, res) => {
  res.json({ price: 1000 });
});
router.use("/user", userRoutes);

export default router;
