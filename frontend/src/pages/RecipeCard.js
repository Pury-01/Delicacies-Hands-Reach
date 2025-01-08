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
  <div className="container py-4" style={{ minHeight: '100vh',
  background: 'linear-gradient(to right, #f8f9fa, turquoise)'
  }}>
    <button className="btn d-flex align-items-center gap-2 text-secondary border-0 mb-4 ps-0"
    onClick={handleBackClick}>
       {"\u2190"} Back
    </button>
    {/* Recipe Heading */}
    <div className="card border-0 shadow-lg mx-auto" style={{ maxWidth: "1000px"}}>

        {/* Hero Section*/}
        <div className="position-relative">
            <img
                src={recipe.image}
                alt={recipe.name}
                className="img-fluid rounded shadow"
                style={{
                    maxHeight: "400px",
                    objectFit: 'cover'
                 }}
            />

            <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)'
            }}>
                <h1 className="text-white mb-0 fs-2 fw-bold">{recipe.name}</h1>                
            </div>
        </div>

        <div className="row p-4 g-4">
            {/* ingredients */}
            <div className="col-md-6">
                <h2 className="fs-4 fw-semibold mb-3">Ingredients</h2>
                <div className="d-flex flex-column gap-2">
                    {recipe.ingredients.map((ingredient, index) => (
                        <div
                            key={index}
                            className="d-flex align-items-center gap-2 p-2 rounded"
                            style={{ backgroundColor: "#f8f9fa" }}
                        >
                            <div
                                className="rounded-circle"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: '#0dcaf0'
                                }}
                             ></div>
                            <span>{ingredient}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Steps */}
            <div className="col-md-6">
                <h2 className="fs-4 fw-semibold mb-3">Instructions</h2>
                <div className="d-flex flex-column gap-4">
                    {recipe.steps.map((step, index) => (
                        <div key={index} className="position-relative ps-4">
                            <div
                                className="position-absloute top-0 start-0 rounded-circle bg-info-subtle text-info d-flex align-items-center justify-content-center"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    fontSize: '14px'
                                }}
                                >
                                {index + 1}
                            </div>
                            <p className="ps-4">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  </div>
 );
}

export default RecipeCard;