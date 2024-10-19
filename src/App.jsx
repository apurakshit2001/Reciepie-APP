// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import RecipeSearch from './component/RecipeSearch/Recipie';
import NutritionAnalysis from './component/NutritionAnalysis/NutritionAnalysis';
import Restaurants from './component/Restaurants/Restaurants';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
// import SLIDESHOW from './component/Restaurants/SLIDESHOW';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe-search" element={<RecipeSearch />} />
        <Route path="/nutrition-analysis" element={<NutritionAnalysis />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
      <Footer/>
    </Router>
    // <SLIDESHOW/>
  );
};

export default App;
