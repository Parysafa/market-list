interface MarketItemProps {
  name: string;
  persianName: string;
  symbol: string;
  price: number;
  priceChangePercent?: string | number;
  volume: number;
  logo?: string;
  quoteSymbol: string;
}

const MarketItem: React.FC<MarketItemProps> = ({
  name,
  persianName,
  symbol,
  price,
  priceChangePercent = 0,
  volume,
  logo,
  quoteSymbol,
}) => {
  const changePercent = priceChangePercent > 0;
  return (
    <div className="grid grid-cols-3 rtl:grid-cols-3 items-center text-center  text-white border-b border-gray-700 py-4 px-6">
      <div className="flex items-center space-x-5 text-left">
        {logo && (
          <img src={logo} alt={symbol} className="w-10 h-10 rounded-full" />
        )}
        <div className="flex flex-col">
          {name} ({symbol})
          <br />
          {persianName}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p
          className={`font-semibold text-lg ${
            changePercent ? "text-green-400" : "text-red-400"
          }`}
        >
          {price.toLocaleString()} {quoteSymbol}
        </p>
      </div>
      <div> {volume}</div>
    </div>
  );
};

export default MarketItem;
