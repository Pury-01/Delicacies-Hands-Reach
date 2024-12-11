// search functionality
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    //  handle form submission
    const handleSubmit = (e) => {
        // prevent page reload
        e.preventDefault();
        // pass query to component thru' search
        onSearch(query);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              // update state as user inputs
              onChange={(e) => setQuery(e.target.value)}
              // placeholder message
              placeholder="Input ingredients"
              />
              <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;