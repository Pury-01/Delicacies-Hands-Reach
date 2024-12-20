// manage states with context API
import React, { createContext, useState } from 'react';

// create context
export const RecipeContext = createContext();

// create provider
export const RecipeProvider = ({ children}) => {
    // manage states
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const limit = 10;

    // handle search query and fetch recipes
    const handleSearch = async (newQuery = query, page = currentPage, limit = 10) => {
      try {
        // set query set if new query is provided
        if (newQuery !== query) setQuery(newQuery);
        
        // send request to the backend
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/recipes?query=${newQuery}&page=${page}&limit=${limit}`
        );

        // check if the request was successful
        if (!response.ok)  {
          throw new Error('Failed to fetch recipes');
        }
        // store the fetched data in json format
        const data = await response.json();

        console.log('Fetched data:', data);

        // update the fetched recipes
        setRecipes(data.recipes);
        //check if it's the last page
        setIsLastPage(data.recipes.length < limit);

        // mark search as performed
        setSearchPerformed(true);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setSearchPerformed(true);
        setRecipes([]);
      }
    };

    // function for handling next page
    const handleNextPage = () => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handleSearch(query, nextPage, limit);
    };

    // function for handling previous page
    const handlePreviousPage = () => {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      handleSearch(query, previousPage, limit);
    };

    return (
        // wrap all children components with RecipeContenxt.Provider 
        // pass all state and functions as the value
        <RecipeContext.Provider
        value={{
          recipes,
          query,
          setQuery,
          searchPerformed,
          currentPage,
          isLastPage,
          handleSearch,
          handleNextPage,
          handlePreviousPage,
        }}
      >
        {children}
        </RecipeContext.Provider>
    );
};
