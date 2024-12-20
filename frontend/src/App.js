import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/LoginPage';

function App() {
  return (
    // Render the app
      <Router>
        <div className="container">
          <h1 className="my-4">Delicacies@Hands-Reach</h1>
          <Routes>
            {/* routes for each page */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />}  />
            </Routes>
        </div>
      </Router>
  );
}

export default App;