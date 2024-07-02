import React, { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex search-form">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="form-control me-2 search-input"
      />
      <button type="submit" className="btn btn-outline-light search-button">Search</button>
      <style jsx>{`
        .search-form {
          display: flex;
          align-items: center;
        }
        .search-input {
          max-width: 500px;
          border-radius: 20px;
          padding: 0.5rem;
          background-color: lavender;
          border: 2px solid teal;
        }
        .search-button {
          border-color: lightpink;
          color: brown;
          border-radius: 10px;
          padding: 0.5rem 1rem;
        }
        .search-button:hover {
          background-color: teal;
          color: orange;
        }
      `}</style>
    </form>
  );
};

export default SearchBar;
