// Landing page
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h5>Gret meals are closer than you think!</h5>
            <nav>
                <ul>
                    <li><Link to='/home'>Search for Recipes</Link></li>
                    <li><Link to='/user/recipes'>My Recipe</Link></li>
                    <li><Link to='/signup'>SignUp</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default LandingPage;