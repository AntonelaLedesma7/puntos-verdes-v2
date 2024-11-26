import React, { ChangeEvent } from 'react';

// Define the props interface
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex items-center w-full max-w-md p-2 bg-[--color-secundary] rounded-full">
      <input
        type="text"
        placeholder="Buscador"
        className="w-full px-4 py-2 text-white bg-transparent border-none outline-none"
        onChange={handleSearch}
      />
      <button className="absolute right-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1013.5 17.5z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
