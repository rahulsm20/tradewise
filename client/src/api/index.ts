import axios from "axios";
import { FieldValues } from "react-hook-form";
import { UserDetailsType } from "../types";
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getNews = async (query: string) => {
  try {
    const response = await api.get(`/news?q=${query}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const addUpdateUserDetails = async (userDetails: UserDetailsType) => {
  try {
    const response = await api.post("/user", { userDetails });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getStockData = async () => {
  try {
    const response = await api.get("/user/stocks");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getWalletData = async () => {
  try {
    const response = await api.get("/user/wallet");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteStock = async (stockId: string) => {
  try {
    const response = await api.delete("/user/stocks", { data: { stockId } });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const searchStock = async (query: string) => {
  try {
    const response = await api.get(`/user/stocks?search=${query}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getBalanceInUSD = async (balance: bigint | 0) => {
  try {
    const response = await api.post(`/user/balanceInUSD`, {
      balance,
    });
    return response.data.balanceInUSD;
  } catch (err) {
    console.error(err);
  }
};

export const getTransactions = async (address: string) => {
  try {
    const response = await api.post("/user/transactions", {
      address,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const addUpdateExpenseItem = async (data: FieldValues) => {
  try {
    const response = await api.post("/user/expenses", data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getExpenseData = async () => {
  try {
    const response = await api.get("/user/expenses");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
