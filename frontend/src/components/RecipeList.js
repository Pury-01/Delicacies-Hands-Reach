// returns list of recipes
import React from 'react';
import { Link } from 'react-router-dom';
   const RecipeList = ({ recipes }) => {

return (
    <div className="row">
        {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <div className="card">
                  <img 
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.name}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/recipe/${recipe.id}`} state={{recipe}}>
                        {recipe.name}
                        </Link>
                    </h5>
                    <p className="card-text">
                        Ingredients: {recipe.ingredients.slice(0, 5).join(', ')}...
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
            <p>No recipes found.</p>
        )}
    </div>
);
};

export  default RecipeList;