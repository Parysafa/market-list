export interface ICurrencies {
    name: string;
    symbol: string;
    persianName: string;
    decimalDigits: number;
    displayDecimalDigits: number;
    currencyType: string;
    isDefaultFiat: boolean;
    isDefaultCrypto: boolean;
    logoAddress: string;
    canBuy: boolean;
    canWithdraw: boolean;
    canDeposit: boolean;
    canTrade: boolean;
    canSettlement: boolean;
    canCharge: boolean;
    specialTips: string;
    enabled: boolean;
    domainCurrencyClassName: string;
    domainCurrencyClassFeeRate: number;
}

export interface ITickerService {
    symbol: string;
    baseCurrencySymbol: string;
    quoteCurrencySymbol: string;
    symbolPublicOfferingDate: number;
    isHighlight: boolean;
    priceChange: number;
    priceChangePercent: number;
    weightedAveragePrice: number;
    lastPrice: number;
    lastQuantity: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    openTime: number;
    closeTime: number;
    firstTradeId: number;
    lastTradeId: number;
    totalTrades: number;
    prevDayClosePrice: number;
    bidPrice: number;
    bidQuantity: number;
    askPrice: number;
    askQuantity: number;
    baseVolume: number;
    quoteVolume: number;
    smartTradeEngine: boolean;
    lastMarketInfoChangeDate: number;
}