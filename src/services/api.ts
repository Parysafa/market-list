import axios from "axios";

export const getCurrencies = async () => {
  const { data } = await axios.get("/api/currencies");
  return data;
};

export const get24hTickers = async () => {
  const { data } = await axios.get("/api/tickers");
  return data;
};
