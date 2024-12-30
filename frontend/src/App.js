import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/LoginPage';
import RecipeCard from './pages/RecipeCard';
import UserRecipes from './pages/UserRecipes'

function App() {
  return (
    // Render the app
      <Router>
        <div className="container">
          <h4 className="my-3" style={{fontStyle: 'italic'}}>Delicacies@Hands-Reach</h4>
          <Routes>
            {/* routes for each page */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />}  />
            <Route path="/recipe/:id" element={<RecipeCard />} />
            <Route path="/user/recipes" element={<UserRecipes />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;