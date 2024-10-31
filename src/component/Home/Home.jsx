import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import { Link } from 'react-router-dom';
import chickenimg from '../../assets/chicken-tikka-masala.webp';
import nutritionimg from '../../assets/nutrition.png';
import restaurantimg from '../../assets/restaurant.jpg';
import banner from '../../assets/banner.png';

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="heroTextContainer">
          <h1 className='heroMainTxt'><span className='large'>Welcome to,</span> <br /> <span className='title'>Recipe Heaven</span></h1>
          <h1 className='heroPara'>Your ultimate destination for delicious recipes and nutrition insights.</h1>
        <button className="get-started-btn">
          <span><Link className="no-decoration" to='/recipe-search'>Get Started</Link></span>
        </button>
        </div>
        <img src={banner} alt="" className="rightSide" />
      </div>

      <div className="recipie other-section hidden">
        <h2>Explore Our Recipes</h2>
        <p>Discover a world of delicious recipes and cooking inspiration.</p>
        <div className="description">
          <img src={chickenimg} alt="Chicken Tikka Masala" />
          <div className="des-txt">
            <h1>Chicken Tikka Masala</h1>
            <p>Indulge in the rich flavors of this classic Indian dish.
              Tender chicken marinated in yogurt and spices, then cooked to perfection in a creamy tomato-based sauce. Served with rice and naan, this dish is a must-try for any Indian food lover.
            </p>
            <button className="explore-btn btn2">
              <span><Link className="no-decoration" to='/recipe-search'>Explore Recipes</Link></span>
            </button>
          </div>
        </div>
      </div>

      <div className="nutrition other-section hidden">
        <h2>Get Nutrition Insights</h2>
        <p>Access detailed nutrition information for your favorite dishes.</p>
        <div className="description">
          <img src={nutritionimg} alt="Nutrition Insights" />
          <div className="des-txt">
            <h1>Nutritional Analysis</h1>
            <p>Stay informed about the nutritional content of your meals. Our platform provides detailed insights on calories, macronutrients, and vitamins to help you make healthier choices.</p>
            <button className="get-nutrition-btn btn3">
              <span><Link className="no-decoration" to='/nutrition-analysis'>Explore Nutrition</Link></span>
            </button>
          </div>
        </div>
      </div>

      <div className="nerbyRestaurants other-section hidden">
        <h2>Find Nearby Restaurants</h2>
        <p>Discover local restaurants near you and explore their menus.</p>
        <div className="description">
          <img src={restaurantimg} alt="Nearby Restaurants" />
          <div className="des-txt">
            <h1>Local Dining</h1>
            <p>Whether you're craving pizza, sushi, or a cozy café, find the best local dining options at your fingertips. Check out reviews and explore menus from restaurants near you.</p>
            <button className="find-restaurants-btn btn1">
              <span><Link className="no-decoration" to='/restaurants'>Find Restaurants</Link></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
