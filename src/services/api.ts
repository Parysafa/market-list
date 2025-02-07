import axios from "axios";
import { ICurrencies, ITickerService } from "../interfaces/services";

export const getCurrencies = async (): Promise<ICurrencies> => {
  const { data } = await axios.get("/api/currencies");
  return data;
};

export const get24hTickers = async (): Promise<ITickerService> => {
  const { data } = await axios.get("/api/tickers");
  return data;
};
