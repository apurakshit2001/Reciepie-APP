import React, { useState, useEffect } from 'react';
import restaurantImg1 from '../../assets/restaurant.jpg';
import restaurantImg2 from '../../assets/restaurant2.jpg';
import restaurantImg3 from '../../assets/restaurant3.jpg';
import './Slideshow.css'; // Import your CSS

const Slideshow = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const slides = [
        { img: restaurantImg1, caption: 'A cozy corner of our restaurant, perfect for a peaceful meal.' },
        { img: restaurantImg2, caption: 'Enjoy your meal with a beautiful view from our patio.' },
        { img: restaurantImg3, caption: 'Delicious cuisine served fresh from our kitchen.' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 2500); // Change slide every 2.5 seconds

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div className={`mySlides ${index === slideIndex ? 'active' : ''}`} key={index}>
                    <div className="numbertext">{index + 1} / {slides.length}</div>
                    <img src={slide.img} style={{ width: '100%', height: '40vh', objectFit: 'cover' }} alt={`Slide ${index + 1}`} />
                    <div className="text">{slide.caption}</div>
                </div>
            ))}
            <br />
            <div style={{ textAlign: 'center' }}>
                {slides.map((_, index) => (
                    <span className={`dot ${index === slideIndex ? 'active-dot' : ''}`} key={index}></span>
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
