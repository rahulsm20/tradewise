import axios from "axios";
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
