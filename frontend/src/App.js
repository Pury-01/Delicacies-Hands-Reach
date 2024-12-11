import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  // state for holding search query and result
  const [recipes, setRecipes] = useState([]);

  // handle search query and fetch recipes
  const handleSearch = (query) => {
    // test query
    console.log('Recipes for ingredients:', query);
    // placeholder for data to be fetched
    setRecipes([]);
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
