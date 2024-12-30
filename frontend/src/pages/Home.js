// Home page
import React, { useContext,useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { RecipeContext } from '../context/RecipeContext';

const Home = () => {
    // Access context
    const { 
        recipes,
        query,
        setQuery,
        searchPerformed,
        currentPage,
        isLastPage,
        handleSearch,
        handleNextPage,
        handlePreviousPage
    } = useContext(RecipeContext);

    // hook to perform search when query or page changes
    useEffect(() => {
        if (query && !searchPerformed) {
           handleSearch(query, currentPage);
        }
    }, [query, currentPage, handleSearch, searchPerformed]); // rerun when there is a change in query or page

    return (
        <div className="container">
            {/* SearchBar to  input search query */}
            <SearchBar onSearch={handleSearch} setQuery={setQuery} />
             <div className='d-flex justify-content-between'>
              
            </div>

            {/* Display search results */}
            {searchPerformed && (
                <div>
                    <h3 className="my-4">Results</h3>

                    {/* RecipeList to display fetched recipes */}
                    <RecipeList recipes={recipes} />

                    {/* pagination controls */}
                    <div className='d-flex justify-content-between my-3'>
                      {/* previous button */}
                      <button
                        className='btn btn-secondary'
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        style={{
                          backgroundColor: currentPage > 1 ? 'blue' : 'grey',
                          color: 'white',
                        }}
                      >
                        Prev
                      </button>

                      {/* Next page */}
                      <button
                        className='btn btn-primary'
                        onClick={handleNextPage}
                        disabled={isLastPage || recipes.length < 10}
                        style={{
                          backgroundColor: !isLastPage ? 'blue' : 'grey',
                          color: 'white',
                        }}
                      >
                        Next
                      </button>
                  </div>
              </div>
           )}
      </div>
    );
}

export default Home;