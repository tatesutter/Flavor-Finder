import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      history.push(`/recipes?search=${searchTerm}`); // Navigate to the Recipes page with the search term
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
