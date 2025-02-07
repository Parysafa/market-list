import { useQueries } from "@tanstack/react-query";
import { getCurrencies, get24hTickers } from "../services/api";
const IMAGE_BASE_URL = "https://cdn.hitobit.com/";

export const useMarketData = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["currencies"],
        queryFn: getCurrencies,
      },
      {
        queryKey: ["tickers"],
        queryFn: get24hTickers,
      },
    ],
  });

  const currencies = queries[0].data;
  const tickers = queries[1].data;
  const isLoading = queries.some((q) => q.isLoading);

  const mergedData = tickers
    ?.map((ticker) => {
      try {
        const baseCurrency = currencies?.find(
          (c) => c.symbol === ticker.baseCurrencySymbol
        );

        if (!baseCurrency) {
          console.warn(
            `Missing currency data for ${ticker.baseCurrencySymbol}`
          );
          return null;
        }

        const quoteCurrency = currencies?.find(
          (c) => c.symbol === ticker.quoteCurrencySymbol
        );

        return {
          id: ticker.symbol,
          name: baseCurrency.name || ticker.baseCurrencySymbol,
          persianName: baseCurrency.persianName,
          symbol: ticker.baseCurrencySymbol,
          price: ticker.lastPrice,
          volume: ticker.baseVolume,
          logo: baseCurrency.logoAddress
            ? `${IMAGE_BASE_URL}${baseCurrency.logoAddress}`
            : undefined,
          quoteSymbol: ticker.quoteCurrencySymbol,
          priceChangePercent: ticker.priceChangePercent,
        };
      } catch (error) {
        console.error("Error processing ticker:", error);
        return null;
      }
    })
    .filter(Boolean);

  return {
    data: mergedData,
    isLoading,
    error: queries.find((q) => q.error)?.error,
  };
};
