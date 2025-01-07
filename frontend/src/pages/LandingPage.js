// Landing page
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarNav'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id="navbarNav">
                        <ul className='navbar-nav ms-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/home">Search for recipes</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/user/recipes">My Recipes</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/signup">SignUp</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className='bg-light text-center py-5'>
                <div className='container'>
                    <h5 className='display-4'>Delicacies@Hands-Reach</h5>
                    <p className='lead'>Discover recipes and create your own culinary masterpiece!</p>
                    <p className='lead'>Great meals are closer than you think!</p>
                    <img src="/images/recipe-10.jpg" alt="Deliciaso!" className='img-fluid rounded shadow' />
                </div>
            </header>

            {/* Main Content */}
            <main className='container py-5'>
                <div className='row'>
                    {/*Profile section*/}
                    <div className="col-md 6 mb-4">
                        <p></p>
                    </div>
                </div>

                {/* About Section */}
                <div className='row'>
                    <div className='col-md-6 mb-4'>
                        <h2 className='fw-bold'>About Us</h2>
                        <p>Delicacies@Hands-Reach is your go-to platform for discovering delicious recipes from around the world. Powered by Spoonacular API, we aim to make cooking enjoyable and easy for everyone.
                            Also you can create and manage your own recipes. 
                        </p>
                    </div>
                </div>
                
                <div className='row'>
                    {/* contact Section */}
                    <div className='col-md-6 mb-4'>
                       <h4>Contact</h4>
                       <p>Have questions or feedback? Reach out.</p>
                       <p><strong>Email:</strong>puryokumu@gmail.com</p>
                    </div>

                    {/* API Credit Section */}
                    <div className='col-md-6 mb-4'>
                        <h4>Credits</h4>
                        <p>This application uses data from the <a href="https://spoonacular.com/food-api" target="_blank" rel="noopener noreferrer">Spoonacular API</a></p>
                    </div>
                </div>
            </main>

            {/* footer */}
            <footer className='bg-dark text-light text-center py-3'>
                <p>@{new Date().getFullYear()} Delicacies@Hands-Reach.All rights reserved.</p>
            </footer>
        </div> 
    );
};

export default LandingPage;