import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS for the navbar
import { Link } from 'react-router-dom';
import logo from '../../assets/logo3.png'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="navbar">
                <div className="menu-btn openMenuButton" >
                    <div className="logo-box">
                        <img src={logo} alt="" />
                        <h1 id='logoTxt'>Recipe Haven</h1>
                    </div>
                    <div onClick={toggleMenu} className={`toggle ${isMenuOpen ? 'active' : ''}`}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
                <div className={`side-navbar ${isMenuOpen ? 'open' : ''}`}>
                    <div className="close-btn" onClick={toggleMenu}>
                        <div className={`toggle ${isMenuOpen ? 'active' : ''}`}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <span><Link className="no-decoration" to="/" onClick={toggleMenu}>Home</Link></span>
                    <span><Link className="no-decoration" to="/recipe-search" onClick={toggleMenu}>Recipe Search</Link></span>
                    <span><Link className="no-decoration" to="/favorite-recipes" onClick={toggleMenu}>Favorite Recipes</Link></span>
                    <span><Link className="no-decoration" to="/nutrition-analysis" onClick={toggleMenu}>Nutrition Analysis</Link></span>
                    <span><Link className="no-decoration" to="/restaurants" onClick={toggleMenu}>Nearby Restaurants</Link></span>
                    <span><Link className="no-decoration" to="/foodNews" onClick={toggleMenu}>Food & News</Link></span>
                    <span><Link className="no-decoration" to="/healthNews" onClick={toggleMenu}>News & Health</Link></span>
                    <span><Link className="no-decoration" to="/quiz" onClick={toggleMenu}>Food & Quiz</Link></span>
                </div>
            </div>
        </>
    );
};

export default Navbar;
