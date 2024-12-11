import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  // state for storing recipes, query and result
  const [recipes, setRecipes] = useState([]);

  // handle search query and fetch recipes
  const handleSearch = async (query) => {
    try {
      // send request to the backend
      const response = await fetch(`/api/recipes?query=${query}`);
      // store the fetched data in json format
      const data = await response.json();
      // update the fetched recipes
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  
  return (
    <div>
      <h1>Recipe Search</h1>
      <SearchBar onSearch={handleSearch} />
    <div>
      <h2>Results</h2>
      <ul>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.name}</h3>
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            </li>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </ul>
      </div>
      </div>
  );
}

export default App;
