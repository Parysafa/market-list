import { CSSProperties, useState } from "react";
// virtual
import { FixedSizeList as List } from "react-window";
// hooks
import { useMarketData } from "../hooks/useMarketData";
// components
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import MarketItem from "../components/MarketItem";

const MarketList: React.FC = () => {
  const { data, isLoading } = useMarketData();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "volume" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredMarkets = data?.filter(
    (market) =>
      market.name.toLowerCase().includes(search.toLowerCase()) ||
      market.symbol.toLowerCase().includes(search.toLowerCase()) ||
      market.persianName.includes(search)
  );

  const sortedMarkets = filteredMarkets?.sort((a, b) => {
    if (!sortBy) return 0;
    return sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
  });

  const handleSort = (field: "price" | "volume") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="bg-primary min-h-screen flex justify-center items-center  text-white">
      <div className="min-h-screen w-full p-6">
        <h1 className="text-3xl font-bold mb-10 ">قیمت لحظه‌ای بازار</h1>
        <div className="mb-6">
          <SearchBar onChange={setSearch} />
        </div>
        <div className="mt-4 h-full ">
          <div className="grid grid-cols-3 items-center font-semibold px-4 py-3 bg-secondary border-b border-gray-600">
            <p className="flex text-gray-300 justify-center">نام رمزارز</p>

            <p
              className="cursor-pointer border-r text-gray-300 hover:text-accent transition-all flex items-center justify-center gap-2"
              onClick={() => handleSort("price")}
            >
              قیمت
              {sortBy === "price" && (
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </p>

            <p
              className="cursor-pointer border-r text-gray-300 hover:text-accent transition-all flex items-center justify-center gap-2 "
              onClick={() => handleSort("volume")}
            >
              حجم
              {sortBy === "volume" && (
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner />
            </div>
          ) : sortedMarkets?.length ? (
            <List
              height={610}
              itemCount={sortedMarkets.length}
              itemSize={100}
              width="100%"
              style={{ direction: "rtl" }}
            >
              {({ index, style }: { index: number; style: CSSProperties }) => (
                <div className="bg-secondary" style={style}>
                  <MarketItem
                    key={sortedMarkets[index].id}
                    {...sortedMarkets[index]}
                  />
                </div>
              )}
            </List>
          ) : (
            <p className="text-center mt-4 text-gray-400">
              هیچ رمزارزی یافت نشد.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketList;
