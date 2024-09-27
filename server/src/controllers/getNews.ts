import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { cacheData, getCachedData } from "../utils";
import dayjs from "dayjs";
dotenv.config();

export const getNews = async (req: Request, res: Response) => {
  const query = req.query.q || "web 3";
  try {
    const key = `news:${query}:${dayjs().format("YYYY-MM-DD")}`;
    const cachedData = await getCachedData(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const response = await axios.get(
        `${process.env.NEWS_API_URL}?q=${query}&apiKey=${process.env.NEWS_API_KEY}&language=en&image=1`
      );
      const truncatedData = response.data.articles.slice(0, 45);
      await cacheData(key, JSON.stringify(truncatedData));
      return res.status(200).json(truncatedData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export default getNews;
