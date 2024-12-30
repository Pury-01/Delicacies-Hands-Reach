// page where users can create and manage their own recipes
import React, { useState} from 'react';

const UserRecipe = () => {
    // state to manage whiteboard mode: readOnly or edit
    const [whiteboardMode, setWhiteboardMode] = useState('readOnly')
    const [recipeContent, setRecipeContent] = useState(
        `Recipe Format:
                                 
         1. Recipe Title:
            [Enter the recipe name]
                                 
         2. Ingredients:
            [List the Ingredients]
                                
                                
         3. Steps:
            [Describe the steps]`
    );

    // function to set whiteboard to edit mode when Add Recipe action
    const handleAddRecipe = () => {
        setWhiteboardMode('edit');
    };
    
    // function to handle input change for editing recipe
    const handleRecipeContentChange = (event) => {
        setRecipeContent(event.target.value)
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

                    <div className='w-100 px-3'>
                        <p className='text-muted mb-2 fs-6'>
                            Saved Recipes
                        </p>
                        {/* place holder for dropdown */}
                        <div
                            className='bg-white border rounded px-2 py-1'
                            style={{ cursor: "pointer" }}
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
                </div>
            </div>
        </div>
    );
};
export default UserRecipe;