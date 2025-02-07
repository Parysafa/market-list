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
    <div className="grid grid-cols-3 rtl:grid-cols-3 items-center text-center  text-white border-b border-accent py-6 px-6">
      <div className="flex justify-start gap-x-4">
        <div>
          {logo && (
            <img
              src={logo}
              alt={symbol}
              className="w-10 h-10 min-h-10 min-w-10 object-cover rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-right">{name}</p>
          <p className="text-right">
            {persianName} <span className="text-sm">({symbol})</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p
          className={`font-semibold break-words text-lg flex flex-col md:flex-row ${
            changePercent ? "text-green-400" : "text-red-400"
          }`}
        >
          <span>{quoteSymbol}</span>
          <span className="mr-2">{price.toLocaleString()}</span>
        </p>
      </div>
      <div className=" break-words "> {volume}</div>
    </div>
  );
};

export default MarketItem;
