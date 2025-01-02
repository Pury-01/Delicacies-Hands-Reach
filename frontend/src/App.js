import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/LoginPage';
import RecipeCard from './pages/RecipeCard';
import UserRecipes from './pages/UserRecipes';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    // Render the app
      <Router>
          <Routes>
            {/* routes for each page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />}  />
            <Route path="/recipe/:id" element={<RecipeCard />} />
            <Route path="/user/recipes" element={<UserRecipes />} />
            </Routes>
      </Router>
  );
}

export default App;