/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { debounce } from "../utils/useDebounce";

const SearchAndFilter = ({ setSearch, setFilter, search, onSearch }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useMemo(
    () =>
      debounce((newSearch) => {
        setSearch(newSearch);
        onSearch();
      }, 1000),
    [setSearch, onSearch]
  );

  useEffect(() => {
    if (searchInput !== search) {
      debouncedSearch(searchInput);
    }
  }, [searchInput, debouncedSearch]);

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 my-8">
      <div className="relative w-full sm:w-2/3 max-w-md">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search books"
          className="w-full px-4 py-2 lg:py-3 pl-12 pr-4 text-gray-200 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      <div className="relative w-full sm:w-1/3 max-w-xs">
        <select
          onChange={(e) => setFilter(e.target.value)}
          onFocus={() => setIsSelectOpen(true)}
          onBlur={() => setIsSelectOpen(false)}
          className="w-full px-4 py-2 lg:py-3 pr-10 bg-[#10130e] text-white border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out cursor-pointer"
        >
          <option value="">All Genres</option>
          <option value="children">Children</option>
          <option value="drama">Drama</option>
          <option value="fiction">Fiction</option>
          <option value="history">History</option>
        </select>
        <ChevronDown
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-300 ${
            isSelectOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
