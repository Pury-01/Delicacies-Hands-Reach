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
        <div className="container">
            <div className='form-group mb-2'>
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
                  </form>
                </div>

                {/* Search button */}
                <div className='d-flex justify-content-between align-items-center'>
                  <button type="submit" className='btn btn-primary mt-3'>Search</button>

                  {/* home link */}
                  <a href="/" className='home-link' style={{fontSize: "18px", marginBottom: "10px", color: "#28a745"}}>
                    <i className='bi bi-house-door-fill'></i> Home
                  </a>
                </div>
    </div>
    );
}

export default SearchBar;