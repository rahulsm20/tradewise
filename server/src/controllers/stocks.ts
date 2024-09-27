import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { polygon } from "../polygon";
import { cacheData, getCachedData } from "../utils";

export const getStocks = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

export const deleteStock = async (req: Request, res: Response) => {
  try {
    const { stockId } = req.body;

    const stock = await prisma.stock.delete({
      where: {
        id: stockId,
      },
    });
    return res
      .status(200)
      .json({ message: "Stock deleted successfully", stock });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};

export const searchStocks = async (req: Request, res: Response) => {
  const { search } = req.query;
  const cacheKey = `search-${search}`;
  try {
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    const stocks = await polygon.reference.tickers({
      search: search as string,
      limit: 10,
    });
    const result = stocks.results;
    const cacheValue = JSON.stringify(result);
    await cacheData(cacheKey, cacheValue);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};
