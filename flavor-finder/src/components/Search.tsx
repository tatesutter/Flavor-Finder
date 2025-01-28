import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/recipes?search=${searchTerm}`); // Navigate to the Recipes page with the search term
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for recipes..."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
