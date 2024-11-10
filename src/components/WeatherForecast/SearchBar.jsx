import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setCity, fetchWeather }) => {
  return (
    <div className="mb-4 flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Enter city"
        className="p-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={fetchWeather}
        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center"
      >
        <FaSearch className="text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
