// page where users can create and manage their own recipes
import React, { useState} from 'react';

const UserRecipe = () => {
    // state to manage whiteboard mode: readOnly or edit
    const [whiteboardMode, setWhiteboardMode] = useState('readOnly');
    const [recipeContent, setRecipeContent] = useState(
        `Recipe Format:
                                 
         1. Recipe Title:
            [Enter the recipe name]
                                 
         2. Ingredients:
            [List the Ingredients]
                                
                                
         3. Steps:
            [Describe the steps]`
    );

    // state to manage viewing/editing saved recipe
    const [isSavedRecipe, setIsSavedRecipe] = useState(false);

    // function to handle Add Recipe action
    const handleAddRecipe = () => {
        setWhiteboardMode('edit');
        setIsSavedRecipe(false);
        setRecipeContent('');
    };

    // function to handle editing of saved recipe
    const handleEditSavedRecipe = () => {
        setWhiteboardMode('edit');
        setIsSavedRecipe(true);
    };

    
    // function to handle input change for editing recipe
    const handleRecipeContentChange = (event) => {
        setRecipeContent(event.target.value)
    };

    // function to handle save action
    const handleSaveRecipe =() => {
        alert('Recipe saved!');
        setWhiteboardMode('readonly');
        setIsSavedRecipe(true);
    };

    // function to handle delete action
    const handleDeleteRecipe = () => {
        alert('Recipe deleted!');
        setRecipeContent('');
        setWhiteboardMode('readOnly');
        setIsSavedRecipe(false);
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
                        {/* place holder for dropdown */}
                        <div
                            className='bg-white border rounded px-2 py-1'
                            style={{ cursor: "pointer" }}
                            onClick={handleEditSavedRecipe}
                        >
                            Click to view Recipes
                        </div>
                    </div>
                </nav>
                {/* work area */}
                <div className='col-9  bg-white p-4'>
                    {/* placeholder for whiteboard */}
                    <div className='form-group'>
                        <textarea
                            className='form-control'
                            placeholder={whiteboardMode === 'readOnly' ? recipeContent : ''}
                            value={whiteboardMode === 'edit' ? recipeContent : ''}
                            onChange={handleRecipeContentChange}
                            rows="20"
                            style={{ fontFamily: 'Times New Roman', fontSize: '16px' }}
                            readOnly={whiteboardMode === 'readOnly'}
                        ></textarea>
                    </div>

                    {/* Action buttons for editing and saving */}
                    {whiteboardMode === 'edit' && (
                        <div className='mt-4 d-flex justify-content-between'>
                            <button className='btn btn-success' onClick={handleSaveRecipe}>
                               Save
                            </button>
                            <button className='btn btn-danger ms-2' on onClick={handleDeleteRecipe}>
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