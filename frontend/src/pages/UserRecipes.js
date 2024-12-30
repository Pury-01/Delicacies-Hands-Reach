// page where users can create and manage their own recipes
import React, { useEffect, useState} from 'react';

const UserRecipe = () => {
    // state to manage recipe details
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');

    // state to manage whiteboard mode: readOnly or edit
    const [whiteboardMode, setWhiteboardMode] = useState('readOnly');

    // state to manage viewing/editing saved recipe
    const [isSavedRecipe, setIsSavedRecipe] = useState(false);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // function to fetch saved recipes
    const fetchSavedRecipes = async () => {
        const response = await fetch('/user/recipes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();
        if (data.recipes) {
            setSavedRecipes(data.recipes);
        } else {
            console.log('Error fetching recipes:', data.message)
        }
    };

    // fetch saved recipes
    useEffect(() => {
        fetchSavedRecipes();
    }, []);

    // function to handle Add Recipe action
    const handleAddRecipe = () => {
        setWhiteboardMode('edit');
        setIsSavedRecipe(false);
        setSelectedRecipe(null);
        setTitle('');
        setIngredients('');
        setSteps('');
    };

    // function to handle editing of saved recipe
    const handleEditSavedRecipe = (recipe) => {
        setWhiteboardMode('edit');
        setIsSavedRecipe(true);
        setSelectedRecipe(recipe);
        setTitle(recipe.title);
        setIngredients(recipe.ingredients);
        setSteps(recipe.steps);
    };

    // function to handle saving a recipe
    const handleSaveRecipe = async() => {
        // save if it's a new recipe
        const newRecipe = { title, ingredients, steps };
        
        try {
            const endpoint = isSavedRecipe
                ? `/user/recipes${selectedRecipe.id}`
                : '/user/recipe'
            const method = isSavedRecipe ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(newRecipe)
                });

                if (response.ok) {
                    alert(isSavedRecipe ? 'Recipe updated successfully!' : 'Recipe added successfully!');
                    fetchSavedRecipes();
                    setWhiteboardMode('readOnly');
                } else {
                    const errorData = await response.json()
                    alert(`Failed to save recipe: ${errorData.message}`);
                } 
        } catch (err) {
            console.error('Error saving recipe:', err)
        }
    };

    // function to handle delete action
    const handleDeleteRecipe = async () => {
        if (!selectedRecipe) return;

        try {
            const response = await fetch(`/user/recipes/${selectedRecipe.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
        if (response.ok) {
            alert('Recipe deleted!');
            fetchSavedRecipes();
            setWhiteboardMode('readOnly');
            setIsSavedRecipe(false);
            setSelectedRecipe(null);
        } else {
            const errorData = await response.json();
            alert(`Failed to delete recipe: ${errorData.message}`)
        }
    } catch (err) {
        console.error('Error deleting recipe:', err)
    }
    };

    return (
        <div className='container-fluid vh-100'>
            <h5 className='display text-center'>My Recipes</h5>
            <p className=' display text-center lead text-muted'>view and manage your favourite recipes!</p>
            {/* full page */}
            <div className='row h-100'>
                {/* sidebar */}
                <nav
                    className='col-3 bg-light d-flex flex-column align-items-center py-4'
                    style={{ borderRight: "1px solid #dee2e6 "}}
                >
                    {/* Home link */}
                    <div className='d-flex justify-content-between'>
                        <a href='/' className='home-link' style={{ fontSize: '18px', marginBottom: '10px', color: '#28a745'}}>
                            <i className='bi bi-house-door-fill'></i>
                            Home
                        </a>
                    </div>
                    {/* profile */}
                    <div className='mb-4 text-centter'>
                        <div
                          className='rounded-circle bg-secondary'
                          style={{ width: "60px", height: "60px "}}
                        ></div>
                        <p className='mt-2 text-muted fs-6'>Username</p>
                    </div>

                    {/*add recipe button */}
                    <button className='btn btn-primary mb-4 w-75' onClick={handleAddRecipe}>+ Add Recipe</button>

                    {/* saved recipes */}
                    <div className='w-100 px-3'>
                        <p className='text-muted mb-2 fs-6'>
                            Saved Recipes
                        </p>
                        {savedRecipes.map((recipe) =>(
                            <div
                              key={recipe.id}
                              className='bg-white border rounded px-2 py-1 mb2'
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditSavedRecipe(recipe)}
                        >
                              {recipe.title}
                            </div>
                        ))}
                    
                    </div>
                </nav>
                {/* work area */}
                <div className='col-9  bg-white p-4'>
                {/* placeholder for whiteboard */}
                    <div className='form-group'>
                        <label>Title</label>
                        <input
                            type='text'
                            className='form-control'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            readOnly={whiteboardMode === 'readOnly'}
                        />

                        <label className='mt-3'>Ingredients</label>
                        <textarea
                            className='form-control'
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            rows='10'
                            readOnly={whiteboardMode === 'readOnly'}
                        ></textarea>

                        <label className='mt-3'>Steps</label>
                        <textarea
                            className='form-control'
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                            rows='15'
                            readOnly={whiteboardMode === 'readOnly'}
                            ></textarea>
                    </div>

                    {/* Action buttons for editing and saving */}
                    {whiteboardMode === 'edit' && (
                        <div className='mt-4 d-flex justify-content-between'>
                            <button className='btn btn-success' onClick={handleSaveRecipe}>
                               Save
                            </button>
                            <button className='btn btn-danger ms-2' onClick={handleDeleteRecipe}>
                                Delete
                            </button>
                      </div>
                    )}
                    </div>
            </div>
        </div>
    );
};
export default UserRecipe;