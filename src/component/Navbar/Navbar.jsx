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
                <div className="menu-btn" onClick={toggleMenu}>
                    <div className="logo-box">
                        <img src={logo} alt="" height={60} width={60}/>
                        <h1 className='logo'>Recipe Haven</h1>
                    </div>
                    <div className={`toggle ${isMenuOpen ? 'active' : ''}`}>
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
                    <span><Link className="no-decoration" to="/nutrition-analysis" onClick={toggleMenu}>Nutrition Analysis</Link></span>
                    <span><Link className="no-decoration" to="/restaurants" onClick={toggleMenu}>Search Restaurants Near Me</Link></span>
                </div>
            </div>
        </>
    );
};

export default Navbar;
