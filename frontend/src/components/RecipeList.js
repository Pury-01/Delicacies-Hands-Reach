// returns list of recipes
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
   

const RecipeList = ({ recipes }) => {
  const navigate = useNavigate();

  const openRecipe = (recipe) => {
    navigate('/recipe-card', { state: { RecipeList: recipes }})
  };

return (
    <div className="row">
        {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <Link to={`/recipe/${recipe.id}`} state={{ recipe }}>
                <div className="card">
                  <img 
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.name}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text">
                        Ingredients: {recipe.ingredients.slice(0, 5).join(', ')}...
                    </p>
                  </div>
                </div>
                </Link>
              </div>
            ))
        ) : (
            <p>No recipes found.</p>
        )}
    </div>
);
};

export  default RecipeList;