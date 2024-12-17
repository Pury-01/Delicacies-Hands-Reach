// returns list of recipes
import React from 'react';
   const RecipeList = ({ recipes }) => {

return (
    <div>
        {recipes.length > 0 ? (
            <ul className="list-group">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="list-group-item">
                        <h3>{recipe.name}</h3>
                        <p>ingredients: {recipe.ingredients.join(', ')}</p>
                        </li>
                    ))}
                    </ul>
                    ) : (
                    <p>No recipes found.</p>
                    )}
                    </div>
                    );
}

export  default RecipeList;