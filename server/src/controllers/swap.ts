import axios from "axios";
import { Request, Response } from "express";

export const swapController = async (req: Request, res: Response) => {
  try {
    const { tokenOne, tokenTwo, tokenOneAmount, address } = req.body;

    const transactionData = await axios.get(
      `https://api.1inch.dev/swap/v6.0/1/swap?src=${tokenOne}&dst=${tokenTwo}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        "0"
      )}&from=${address}&origin=${address}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`,
        },
        params: {
          slippage: 1,
        },
      }
    );
    return res.json(transactionData.data);
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTokenPrice = async (req: Request, res: Response) => {
  try {
    const { tokenOne, tokenTwo, tokenOneAmount } = req.body;
    const result = await axios.get(
      `https://api.1inch.dev/swap/v6.0/1/quote?src=${tokenOne}&dst=${tokenTwo}&amount=${tokenOneAmount}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`,
        },
      }
    );
    return res.status(200).json(result.data);
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: "Internal server error" });
  }
};

// const oneInchClient = async(req:Request,res:Response)=>{
//     try{
//         const data =
//     }
//     catch(err){
//         console.log({err})
//     }
// }
