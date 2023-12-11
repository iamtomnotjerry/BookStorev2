// components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search books..."
        className="border p-2 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
