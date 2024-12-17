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
        <div className="form=group">
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              value={query}
              // update state as user inputs
              onChange={(e) => setQuery(e.target.value)}
              // placeholder message
              placeholder="Input ingredients to search..."
              />
              <button type="submit" className="btn btn-primary mt-3">Search</button>
        </form>
        </div>
    );
}

export default SearchBar;