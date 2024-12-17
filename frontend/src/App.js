import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  // state for storing recipes, query and result
  const [recipes, setRecipes] = useState([]);
  // track if search was perfomed
  const [searchPerformed, setSearchPerformed] = useState(false);

  // handle search query and fetch recipes
  const handleSearch = async (query) => {
    try {
      // send request to the backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes?query=${query}`);

      // check if the request was successful
      if (!response.ok)  {
        throw new Error('Failed to fetch recipes');
      }
      // store the fetched data in json format
      const data = await response.json();
      console.log(data);
      // update the fetched recipes
      setRecipes(data);

      // mark search as performed
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setSearchPerformed(true);
      setRecipes([]);
    }
  };
  
  return (
    <div className="container">
      <h1 className="my-4">Recipe Search</h1>
      <SearchBar onSearch={handleSearch} />
    
    {/* show results only if search was performed */}
    {searchPerformed && (
      <div>
        <h2 className="my-4">Results</h2>
        <RecipeList recipes={recipes} /> 
      </div>
    )}
    </div>
  );
}

export default App;
