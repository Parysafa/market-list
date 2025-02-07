import { useState } from "react";
import DeleteIcon from "../assets/icons/deleteIcon.svg";

interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const [search, setSearch] = useState("");

  const handleClear = () => {
    setSearch("");
    onChange("");
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={search}
          placeholder="جستجو براساس نام و نماد (انگلیسی/فارسی)"
          className="w-full p-3 border border-accent rounded-3xl
 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          onChange={(e) => {
            setSearch(e.target.value);
            onChange(e.target.value);
          }}
        />
        {search && (
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            onClick={handleClear}
          >
            <img src={DeleteIcon} alt="delete" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
