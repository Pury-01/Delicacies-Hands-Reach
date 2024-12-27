// displays full details of a recipe
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// function to display recipe details
const RecipeCard = () => {
    // get recipe data passed via the state from Link
    const location = useLocation();
    const { recipe } = location.state || {};
    const navigate = useNavigate();

    // handle to go back to RecipeList
    const handleBackClick = () => {
        navigate(-1);
    }
 // handle errors
 if (!recipe) {
    return <div className="alert alert-danger">Recipe not found!</div>
 }

 return (
  <div className="container py-4" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
    <button className="back-button" onClick={handleBackClick}>
       {"\u2190"} Back
    </button>
    {/* Recipe Heading */}
    <h2 className="text-center text-danger fw-bold" style={{ fontfamily: "'Dancing Script', cursive"}}>{recipe.name}</h2>

    {/* Recipe Image */}
    <div className="text-center mb-4">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="img-fluid rounded shadow"
          style={{ maxHeight: "400px" }}
          />
    </div>

    {/* Ingredients */}
    <h2 className="text-primary">Ingredients</h2>
    <ul className="list-group mb-4">
        {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="list-group-item">
                {ingredient}
            </li>        
        ))}
    </ul>

    {/* Steps */}
    <h2 className="text-primary">Steps</h2>
    <ol className="list-group list-group-numbered">
        {recipe.steps.map((step, index) => (
            <li key={index} className="list-group-item">
                {step}
            </li>
        ))}
    </ol>
  </div>  
 );
};

export default RecipeCard;