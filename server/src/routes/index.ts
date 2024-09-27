import express from "express";
import getNews from "../controllers/getNews";
import userRoutes from "./user";
const router = express.Router();

router.get("/", (_, res) =>
  res.json({ status: "ok", message: "tradewise API" })
);
router.get("/news", getNews);
router.use("/user", userRoutes);

export default router;
