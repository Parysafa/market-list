import { useQueries } from "@tanstack/react-query";
import { getCurrencies, get24hTickers } from "../services/api";
import { ICurrencies, ITickerService } from "../interfaces/services";

const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL

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

  const currencies: ICurrencies[] = queries[0].data;
  const tickers = queries[1].data ?? [];
  const isLoading = queries.some((q) => q.isLoading);

  const mergedData = Array.isArray(tickers) && tickers
    ?.map((ticker: ITickerService) => {
      try {
        const baseCurrency = currencies?.find(
          (c: ICurrencies) => c.symbol === ticker.baseCurrencySymbol
        );

        if (!baseCurrency) {
          console.warn(
            `Missing currency data for ${ticker.baseCurrencySymbol}`
          );
          return null;
        }

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
        return null;
      }
    })
    .filter(Boolean);


  // we use useQueries hook so maybe we have 2 kind of errors !
  const errorReason = queries.find((q) => q.error)?.error;

  return {
    data: mergedData,
    isLoading,
    error: errorReason,
  };
};
