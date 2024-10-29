import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import RecipeSearch from './component/RecipeSearch/Recipie';
import NutritionAnalysis from './component/NutritionAnalysis/NutritionAnalysis';
import Restaurants from './component/Restaurants/Restaurants';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import FavoriteRecipes from './component/FavoriteRecipes/FavoriteRecipes';
import FoodNews from './component/FoodNews/FoodNews';
import HealthNews from './component/HealthNews/HealthNews';
import QuizComponent from './component/Quiz/QuizComponent';

const App = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const halfPageHeight = document.documentElement.scrollHeight / 2;
      
      if (scrollPosition > halfPageHeight) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe-search" element={<RecipeSearch />} />
        <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
        <Route path="/nutrition-analysis" element={<NutritionAnalysis />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/foodNews" element={<FoodNews />} />
        <Route path="/healthNews" element={<HealthNews />} />
        <Route path="/quiz" element={<QuizComponent />} />
      </Routes>
      <div className={`upArrow ${showArrow ? 'visible' : 'hidden'}`}>
        <a className='arrow' href="#">↑</a>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
